import { Button } from "antd";
import { ButtonType } from "antd/lib/button";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import React from "react";
import { useTranslation } from "react-i18next";


interface ButtonProps {
    onClick?: React.MouseEventHandler<HTMLElement>;
    disabled?: boolean | undefined;
    loading?: boolean | undefined;
    text?: string | undefined;
    type?: ButtonType;
    danger?: boolean | undefined;
    style?: React.CSSProperties;
    size?: SizeType;
}

export const AddButton = (props: ButtonProps) => {
    const { t: globalT } = useTranslation("global");

    return(
        <Button type="primary" {...props}>{globalT("create")}</Button>
    );
}
