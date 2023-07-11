// capitalize only the first letter of the string.
export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const formatOptions = (sortItems, selectedValue) => {
  return sortItems.map((item) => {
    return {
      label: item.label,
      value: item.value,
      isSelected: item.value === selectedValue ? true : false,
    };
  });
};
