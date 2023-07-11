# Hook Usage

## useToggle

Basically, what this hook does is that, it takes a parameter with value true or false and toggles that value to opposite. It's useful when we want to take some action into it's opposite action, for example: show and hide modal, show more/show less text, open/close side menu.

```
// Usage
function App() {
    // Call the hook which returns, current value and the toggler function
    const [isTextChanged, setIsTextChanged] = useToggle();

    return (
        <button onClick={setIsTextChanged}>{isTextChanged ? 'Toggled' : 'Click to Toggle'}</button>
    );
}
```

## useMemoCompare

This hook is similar to useMemo, but instead of passing an array of dependencies we pass a custom compare function that receives the previous and new value. The compare function can then compare nested properties, call object methods, or anything else to determine equality. If the compare function returns true then the hook returns the old object reference.

It's worth noting that, unlike useMemo, this hook isn't meant to avoid expensive calculations. It needs to be passed a computed value so that it can compare it to the old value. Where this comes in handy is if you want to offer a library to other developers and it would be annoying to force them to memoize an object before passing it to your library. If that object is created in the component body (often the case if it's based on props) then it's going to be a new object on every render. If that object is a useEffect dependency then it's going to cause the effect to fire on every render, which can lead to problems or even an infinite loop. This hook allows you to avoid that scenario by using the old object reference instead of the new one if your custom comparison function deems them equal.

```
import React, { useState, useEffect, useRef } from "react";
// Usage
function MyComponent({ obj }) {
  const [state, setState] = useState();
  // Use the previous obj value if the "id" property hasn't changed
  const objFinal = useMemoCompare(obj, (prev, next) => {
    return prev && prev.id === next.id;
  });
  // Here we want to fire off an effect if objFinal changes.
  // If we had used obj directly without the above hook and obj was technically a
  // new object on every render then the effect would fire on every render.
  // Worse yet, if our effect triggered a state change it could cause an endless loop
  // where effect runs -> state change causes rerender -> effect runs -> etc ...
  useEffect(() => {
    // Call a method on the object and set results to state
    return objFinal.someMethod().then((value) => setState(value));
  }, [objFinal]);
  // So why not pass [obj.id] as the dependency array instead?
  useEffect(() => {
    // Then eslint-plugin-hooks would rightfully complain that obj is not in the
    // dependency array and we'd have to use eslint-disable-next-line to work around that.
    // It's much cleaner to just get the old object reference with our custom hook.
    return obj.someMethod().then((value) => setState(value));
  }, [obj.id]);
  return <div> ... </div>;
}
```

## useWhyDidYouUpdate

This hook makes it easy to see which prop changes are causing a component to re-render. If a function is particularly expensive to run and you know it renders the same results given the same props you can use the React.memo higher order component, as we've done with the Counter component in the below example. In this case if you're still seeing re-renders that seem unnecessary you can drop in the useWhyDidYouUpdate hook and check your console to see which props changed between renders and view their previous/current values. Pretty nifty huh?

```
import { useState, useEffect, useRef } from "react";
// Let's pretend this <Counter> component is expensive to re-render so ...
// ... we wrap with React.memo, but we're still seeing performance issues :/
// So we add useWhyDidYouUpdate and check our console to see what's going on.
const Counter = React.memo((props) => {
  useWhyDidYouUpdate("Counter", props);
  return <div style={props.style}>{props.count}</div>;
});
function App() {
  const [count, setCount] = useState(0);
  const [userId, setUserId] = useState(0);
  // Our console output tells use that the style prop for <Counter> ...
  // ... changes on every render, even when we only change userId state by ...
  // ... clicking the "switch user" button. Oh of course! That's because the
  // ... counterStyle object is being re-created on every render.
  // Thanks to our hook we figured this out and realized we should probably ...
  // ... move this object outside of the component body.
  const counterStyle = {
    fontSize: "3rem",
    color: "red",
  };
  return (
    <div>
      <div className="counter">
        <Counter count={count} style={counterStyle} />
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
      <div className="user">
        <img src={`http://i.pravatar.cc/80?img=${userId}`} />
        <button onClick={() => setUserId(userId + 1)}>Switch User</button>
      </div>
    </div>
  );
}
```

## useLockBodyScroll

Sometimes you want to prevent your users from being able to scroll the body of your page while a particular component is absolutely positioned over your page (think modal or full-screen mobile menu). It can be confusing to see the background content scroll underneath a modal, especially if you intended to scroll an area within the modal. Well, this hook solves that! Simply call the useLockBodyScroll hook in any component and body scrolling will be locked until that component unmounts.

```
import { useState, useLayoutEffect } from "react";
// Usage
function App() {
  // State for our modal
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
function Modal({ title, content, onClose }) {
  // Call hook to lock body scroll
  useLockBodyScroll();
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}
```

## useOnScreen

This hook allows you to easily detect when an element is visible on the screen as well as specify how much of the element should be visible before being considered on screen. Perfect for lazy loading images or triggering animations when the user has scrolled down to a particular section.

```
import { useState, useEffect, useRef } from "react";
// Usage
function App() {
  // Ref for the element that we want to detect whether on screen
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref, "-300px");
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <h1>Scroll down to next section 👇</h1>
      </div>
      <div
        ref={ref}
        style={{
          height: "100vh",
          backgroundColor: onScreen ? "#23cebd" : "#efefef",
        }}
      >
        {onScreen ? (
          <div>
            <h1>Hey I'm on the screen</h1>
            <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
          </div>
        ) : (
          <h1>Scroll down 300px from the top of this section 👇</h1>
        )}
      </div>
    </div>
  );
```

## useOnClickOutside

This hook allows you to detect clicks outside of a specified element. In the example below we use it to close a modal when any element outside of the modal is clicked. By abstracting this logic out into a hook we can easily use it across all of our components that need this kind of functionality (dropdown menus, tooltips, etc).

```
import { useState, useEffect, useRef } from "react";
// Usage
function App() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => setModalOpen(false));
  return (
    <div>
      {isModalOpen ? (
        <div ref={ref}>
          👋 Hey, I'm a modal. Click anywhere outside of me to close.
        </div>
      ) : (
        <button onClick={() => setModalOpen(true)}>Open Modal</button>
      )}
    </div>
  );
}
```

## useWindowSize

A really common need is to get the current size of the browser window. This hook returns an object containing the window's width and height. If executed server-side (no window object) the value of width and height will be undefined.

```
import { useState, useEffect } from "react";
// Usage
function App() {
  const size = useWindowSize();
  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}
```

## useHover

Detect whether the mouse is hovering an element. The hook returns a ref and a boolean value indicating whether the element with that ref is currently being hovered. Just add the returned ref to any element whose hover state you want to monitor. One potential bug with this method: If you have logic that changes the element that hoverRef is added to then your event listeners will not necessarily get applied to the new element. If you need this functionality then use this alternate version that utilizes a callback ref.

```
// Usage
function App() {
  const [hoverRef, isHovered] = useHover();
  return <div ref={hoverRef}>{isHovered ? "😁" : "☹️"}</div>;
}
```
