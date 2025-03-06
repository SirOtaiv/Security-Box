import React, {
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from "react";
import MaterialTextField from "@mui/material/TextField";
import { Box, TextFieldProps, Tooltip, useTheme } from "@mui/material";
import { HelpTwoTone as HelpTwoToneIcon } from "@mui/icons-material";

const getDefaultValue = (defaultValue: string) => {
    try {
        return defaultValue.toString();
    } catch {
        return "";
    }
};

export type TextFieldRefProps = {
    setLabel: React.Dispatch<any>;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    getValue: () => string;
    setValid: React.Dispatch<React.SetStateAction<boolean>>;
    isValid: () => boolean;
};

type PropsType = {
    id?: string;
    defaultValue?: string;
    defaultValid?: boolean;
    regularExpression?: RegExp;
    autoValidation?: boolean;
    className?: string;
    onChange?: (...args: any[]) => void;
    onClick?: (...args: any[]) => void;
    onKeyDown?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    tooltip?: string | ReactNode;
} & Omit<TextFieldProps, "onChange" | "onKeyDown">;

const TextField = forwardRef((props: PropsType, ref) => {
    const {
        id,
        defaultValue,
        defaultValid,
        regularExpression,
        autoValidation,
        className,
        onChange,
        onKeyDown,
        onBlur,
        tooltip,
        onClick,
        ...materialProps
    } = props;

    const appTheme = useTheme();

    const [label, setLabel] = useState(
        tooltip ? (
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                {materialProps.label || ""}
                <Tooltip title={tooltip}>
                    <HelpTwoToneIcon
                        fontSize="inherit"
                        color="primary"
                        sx={{ marginLeft: "5px" }}
                    />
                </Tooltip>
            </Box>
        ) : (
            materialProps.label || ""
        ),
    );
    const [value, setValue] = useState(
        defaultValue ? getDefaultValue(defaultValue) : "",
    );
    const [valid, setValid] = useState(defaultValid !== false);

    const getValue = () => value;

    const isValid = () => valid;

    const handleOnChange = ({ target, nativeEvent }: any) => {
        if (nativeEvent.inputType === "deleteContentBackward") {
            setValue(target.value);
        }

        if (!regularExpression || regularExpression.test(target.value)) {
            if (!valid) {
                setValid(true);
            }

            setValue(target.value);

            if (onChange) {
                onChange(target.value);
            }
        }
    };

    const handleOnKeyDown = (event: any) => {
        if (
            autoValidation &&
            event.keyCode === 13 &&
            (!value || !value.trim())
        ) {
            setValid(false);

            return;
        }

        if (onKeyDown) {
            onKeyDown(event, value);
        }
    };

    const handleOnBlur = (event: unknown) => {
        if (onBlur) {
            onBlur(event);
        }
    };

    useEffect(() => {
        setValue(
            getDefaultValue(defaultValue ? getDefaultValue(defaultValue) : ""),
        );
    }, [defaultValue]);

    useEffect(() => {
        setValid(defaultValid !== false);
    }, [defaultValid]);

    useImperativeHandle<unknown, TextFieldRefProps>(ref, () => ({
        setLabel,
        setValue,
        getValue,
        setValid,
        isValid,
    }));

    return (
        <MaterialTextField
            {...materialProps}
            id={id}
            className={className}
            size={materialProps.size || "small"}
            variant="outlined"
            margin={materialProps.margin || "none"}
            label={label}
            value={value}
            error={!valid}
            helperText={
                valid ? "" : materialProps.helperText || "Required field"
            }
            InputLabelProps={{ style: { pointerEvents: "auto" } }}
            InputProps={{
                sx: {
                    "&:hover:not(.Mui-focused):not(.Mui-error) fieldset": {
                        borderColor: "background.default",
                    },
                },
                ...(materialProps.InputProps || {}),
            }}
            sx={{
                ...materialProps.sx,
                backgroundColor: "background.paper",
                input: {
                    "&:-webkit-autofill": {
                        WebkitBoxShadow: `0 0 0 30px background.paper inset !important`,
                    },
                    cursor: materialProps.disabled ? "not-allowed" : "",
                },
            }}
            onChange={handleOnChange}
            onKeyDown={handleOnKeyDown}
            onBlur={handleOnBlur}
            onClick={onClick}
        />
    );
});

TextField.displayName = "TextField";

export default TextField;
