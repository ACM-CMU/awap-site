import React from 'react';

import classNames from 'classnames';

import { Image } from './image';
import { Input } from './input';
import { Info } from './info';
import { SizeType, Text } from './text';

import png_logo from '../dog_logo.png';
import awap from '../awap-text.png';
import './card.scss';

type Line = {
    size: SizeType;
    content: string;
    delay: number;
    isGlitched: boolean;
    link?: string;
    onClick?: () => void;
    className?: string;
};

type Props = {
    delay: number;
};

type State = {
    img: string;
    imgThreshold: number;
    currActive: number;
    lines: Array<Line>;
    timeout: number;
    overlay: boolean;
};

export class Card extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            img: png_logo,
            imgThreshold: 1,
            currActive: 0,
            lines: [
                {
                    size: "medium",
                    delay: 10,
                    content: "2022 edition, brought to you by ACM@CMU",
                    isGlitched: false,
                    className: "acm-msg",
                },
                {
                    size: "small",
                    delay: 7,
                    content: "location: in-person @ Gates-Hillman Center",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "start: saturday, february 19, 11:00 am",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "end: saturday, february 19, 6:00 pm",
                    isGlitched: false,
                },
                {
                    size: "small",
                    delay: 7,
                    content: "~ ready? click here to register",
                    isGlitched: false,
                    link: "https://forms.gle/hXvrFZhVmt1oBXSD9",
                    className: "wide-top",
                },
                {
                    size: "small",
                    delay: 7,
                    content: "~ not ready yet? click here for more info",
                    isGlitched: false,
                    onClick: this.showPopup,
                }
            ],
            timeout: 0,
            overlay: false,
        };
    };

    showPopup = () => {
        this.setState({ overlay: true });
    };

    hidePopup = () => {
        this.setState({ overlay: false });
    }

    onFinish = () => {
        const { delay } = this.props;
        const { currActive } = this.state;
        this.setState({
            timeout: window.setTimeout(() => {
                this.setState({ currActive: currActive + 1 })
            }, delay),
        });
    };

    componentWillUnmount() {
        const { timeout } = this.state;
        window.clearTimeout(timeout);
    };

    renderRight() {
        const { currActive, lines } = this.state;
        let output = [];

        for (let i = 0; i < lines.length; i++) {
            const { size, content, delay, isGlitched, link, onClick, className } = lines[i];
            let text = (
                <Text size={size} className={className} link={link} onClick={onClick} key={i}>
                    <Input
                        text={content}
                        delay={delay}
                        active={i <= currActive}
                        finish={this.onFinish}
                        isGlitch={isGlitched}
                    />
                </Text>
            )
            output.push(text);
        }
        return output;
    };

    render() {
        const { overlay } = this.state;
        let cardClasses = "card"
        if (overlay) {
            cardClasses = classNames(cardClasses, "blur");
        }
        return (
            <>
                <Info active={overlay} hidePopup={this.hidePopup} />
                <div className={cardClasses}>
                    <div className="left"><Image minOpacity={1} maxOpacity={1} img={png_logo} /></div>
                    <div className="right">
                        <Image minOpacity={0.1} maxOpacity={0.9} img={awap} />
                        {this.renderRight()}
                    </div>
                </div>
            </>
        );
    };
};
