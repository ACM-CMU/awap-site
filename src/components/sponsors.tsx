import React from 'react';
import classNames from 'classnames';
import './sponsors.scss';

import aptiv from './logos/aptiv.svg';
import bloomberg from './logos/bloomberg.svg';
import microsoft from './logos/microsoft.svg';
import sandia from './logos/sandia.svg';
import scm from './logos/scm.png';
import hrt from './logos/hrt.png';

type Props = {
    delay: number;
};

type State = {
    currActive: number;
    timeout: number;
    overlay: boolean;
};

export class Sponsors extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            currActive: 0,
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

    render() {
        const { overlay } = this.state;
        let cardClasses = "sponsors"
        if (overlay) {
            cardClasses = classNames(cardClasses, "blur");
        }
        return (
            <>
                {/* <Info active={overlay} hidePopup={this.hidePopup} /> */}
                <div className={cardClasses}>
                    <img className="aptiv" src={aptiv} alt={aptiv} />
                    <img className="bloomberg" src={bloomberg} alt={bloomberg} />
                    <img className="hrt" src={hrt} alt={hrt} />
                    <img className="microsoft" src={microsoft} alt={microsoft} />
                    <img className="sandia" src={sandia} alt={sandia} />
                    <img className="scm" src={scm} alt={scm} />
                </div>
            </>
        );
    };
}; 