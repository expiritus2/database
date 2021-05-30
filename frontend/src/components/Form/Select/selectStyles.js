const setUnit = (px) => `${px / 16}rem`;
const borderColor = '#dee2e6';

export default ({ menuTop }) => ({
    control: (base) => ({
        ...base,
        minHeight: setUnit(40),
        outline: 'none',
        boxShadow: 'none',
        borderColor,
        borderRadius: setUnit(8),
        cursor: 'pointer',
        ':hover': { borderColor },
        ':focus': { borderColor },
    }),
    option: (base) => ({
        ...base,
        ':hover': { cursor: 'pointer' },
    }),
    menu: (base) => ({
        ...base,
        top: menuTop ? 'auto' : base.top,
        bottom: menuTop ? '100%' : 'auto',
    }),
});
