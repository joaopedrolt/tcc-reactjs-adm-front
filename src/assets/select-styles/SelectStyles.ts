import { StylesConfig } from "react-select";

export const OrdersSelectStyle: StylesConfig = {
    control: (base) => ({ ...base, padding: "4px", border: 0, boxShadow: 'none', borderRadius: '15px' }),
    container: (base) => ({ ...base, width: "80%", margin: "auto", marginBottom: "25px" }),
    option: (base, { isSelected }) => ({
        ...base,
        "&:hover": {
            backgroundColor: "#ffa25f75"
        },
        color: isSelected ? 'black' : 'black',
        backgroundColor: isSelected ? 'white' : 'white'
    })
}

export const DriverTruckSelect: StylesConfig = {
    control: (base) => ({ ...base, padding: "5px 3px", border: 0, boxShadow: "none"}),
    container: (base) => ({
        ...base,
        width: "90%",
        marginTop: "5px",
        height: "49px",
        cursor: "pointer",
        backgroundColor: "white",
        borderRadius: "8px"
    }),
    option: (base, { isSelected }) => ({
        ...base,
        "&:hover": {
            backgroundColor: "#ffa25f75"
        },
        color: isSelected ? 'black' : 'black',
        backgroundColor: isSelected ? 'white' : 'white'
    }),
    placeholder: (base) => {
        return {
            ...base,
            color: 'black'
        }
    }
}