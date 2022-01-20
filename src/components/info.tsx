import React from 'react';
import './info.scss';

import aptiv from './logos/aptiv.svg';
import bloomberg from './logos/bloomberg.svg';
import echoar from './logos/echoar.png';
import microsoft from './logos/microsoft.svg';
import sandia from './logos/sandia.svg';
import scm from './logos/scm.png';

type TabType = "schedule" | "faq" | "sponsors";

type Props = {
    active: boolean;
    hidePopup: () => void;
}

type State = {
    tab: TabType;
}

export class Info extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            tab: "schedule",
        };
    };

    renderTab() {
        const { tab } = this.state;
        if (tab === "schedule") {
            return (
                <>
                    <div className="content-title">schedule of events</div>
                    <div className="note">Note: all times in eastern time (EST)</div>
                    <div className="schedule">
                        <div className="day-events">
                            <div className="dow">Friday, February 25</div>
                            <div className="entry">5:00 Opening ceremony</div>
                            <div className="entry">6:00 Hacking starts!</div>
                        </div>
                    </div>
                </>
            );
        } else if (tab === "faq") {
            return (
                <>
                    <div className="content-title">faq</div>
                    <div className="question">Q: What is Algorithms with a Purpose (AWAP)?</div>
                    <div className="answer">AWAP is a 6-hour long competition that poses an open-ended problem. Teams of up to 4 will implement an AI to "play" the given game.</div>
                    <div className="question">Q: What if I don’t have a team?</div>
                    <div className="answer">Don’t worry, there will be a virtual mixer at the start of the event, where you will be shuffled around in Zoom breakout rooms and meet other individual hackers.</div>
                    <div className="question">Q: Do I need to have experience?</div>
                    <div className="answer">This is a beginner-friendly competition and only basic knowledge of Python is necessary. Some basic knowledge on data structures and algorithms may be helpful. </div>
                    <div className="question">Q: Will there be prizes or swag?</div>
                    <div className="answer">We will be shipping prizes to the winners after the hackathon in the US. Unfortunately we are unable to ship internationally, but if you come back to campus in later semesters, we will be sure to get the prizes to you. We are also working on getting tshirts, but still are figuring out how to distribute those to people on campus in a safe manner. If you are not on campus, you can pick up a t-shirt in later semesters.</div>
                    <div className="question">Q: Who runs this event?</div>
                    <div className="answer">You can learn more about us ACM@CMU <a href="https://acmatcmu.org">over here.</a></div>
                </>
            );
        } else {
            return (
                <>
                    <div className="content-title">sponsors</div>
                    <div className="thanks">This event would simply not be possible without the help of our sponsors. We are immensely thankful for our sponsors below.</div>
                    <div className="logos">
                        <img className="aptiv" src={aptiv} alt={aptiv} />
                        <img className="bloomberg" src={bloomberg} alt={bloomberg} />
                        <img className="echoar" src={echoar} alt={echoar} />
                        <img className="microsoft" src={microsoft} alt={microsoft} />
                        <img className="sandia" src={sandia} alt={sandia} />
                        <img className="scm" src={scm} alt={scm} />
                    </div>
                </>
            );
        }
    };

    changeTab(newTab: TabType) {
        this.setState({ tab: newTab });
    };

    renderTabs() {
        let tabs: Array<TabType> = ["schedule", "faq", "sponsors"];
        let buttons = []
        for (let i = 0; i < tabs.length; i++) {
            let clickFn = () => this.changeTab(tabs[i]);
            let button = <div className="tab-button" onClick={clickFn}>{tabs[i]}</div>
            buttons.push(button);
        }
        return (
            <div className="tabs">{buttons}</div>
        );
    };

    render() {
        const { active, hidePopup } = this.props;
        if (active) {
            return (
                <div className="info">
                    <div className="info-container">
                        <a className="close-info" onClick={hidePopup} />
                        <div className="navbar">
                            {this.renderTabs()}
                        </div>
                        <div className="content">
                            {this.renderTab()}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
};
