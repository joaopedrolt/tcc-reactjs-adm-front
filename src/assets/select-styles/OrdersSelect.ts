import { StylesConfig } from "react-select";

const OrdersSelectStyle: StylesConfig = {
    control: (base) => ({ ...base, padding: "4px", border: 0, boxShadow: 'none' }),
    container: (base) => ({ ...base, width: "80%", margin: "auto", marginBottom: "25px" }),
    option: (base, state) => ({...base,
        "&:hover": {
            backgroundColor: "#ffa25f75"
        },
        backgroundColor: state.data === state.selectProps.value ? "#d1844d" : "",
    })
}

export default OrdersSelectStyle;