import React from 'react';

import classNames from 'classnames';

import { Image } from './image';
import { Input } from './input';
import { Info } from './info';
import { SizeType, Text } from './text';

import webimage from '../website-image.png';
import awap from '../awap-w-text.png';
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
            img: webimage,
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
                    content: "location: in-person @ Gates-Hillman Center - events over! Thanks to all that participated",
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
                    content: "click here for closing ceremony slides",
                    link: "https://docs.google.com/presentation/d/1S_tIKehZKy-5SaKikzkmabvb45Xq30xtz3aggwNMc50/edit#slide=id.p",
                    isGlitched: false,
                    className: "wide-top"
                },
                {
                    size: "small",
                    delay: 7,
                    content: "fill up the feedback form if you haven't!",
                    link: "https://docs.google.com/forms/d/e/1FAIpQLScR2J_Isn_ee8dBxbiqi1RdWM43wRGYGeZ_9qhkOcCl2a8TJQ/viewform?usp=sf_link",
                    isGlitched: false,              
                },
                {
                    size: "small",
                    delay: 7,
                    content: "click here for more info",
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
                    <div className="left"><Image minOpacity={0.95} maxOpacity={1} img={webimage} /></div>
                    <div className="right">
                        <Image minOpacity={0.1} maxOpacity={0.9} img={awap} />
                        {this.renderRight()}
                    </div>
                </div>
            </>
        );
    };
};
