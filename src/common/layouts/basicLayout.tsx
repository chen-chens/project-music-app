import { Col, Divider, Row, Typography } from "antd";
import React from "react";


interface BasicLayoutProps{
    title: string;
    main: JSX.Element;
    details?: JSX.Element;
}

export default function BasicLayout(props: BasicLayoutProps){

    return(
        <Row gutter={[15, 15]}>
            <Col span={24}>
                <Typography.Title level={2}>{props.title}</Typography.Title>
            </Col>
            <Col span={24}>{props.main}</Col>
            <Divider dashed style={{margin: 0}}/>
            <Col span={24}>{props.details}</Col>
        </Row>
    )
}