import React from 'react';
import './info.scss';

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
                            <div className="dow">Saturday, February 19</div>
                            <div className="entry">11:00 Opening ceremony</div>
                            <div className="entry">6:00 Event ends!</div>
                        </div>
                    </div>
                </>
            );
        } else if (tab === "faq") {
            return (
                <>
                    <div className="content-title">faq</div>
                    <div className="question">Q: What is Algorithms with a Purpose (AWAP)?</div>
                    <div className="answer">AWAP is an exciting 7-hour algorithms hackathon that poses an open-ended problem. Teams of up to 4 will implement creative and clever solutions and compete to win prizes! This year’s theme involves cell towers and cities. The event will be open to both newcomers and experienced hackers, with two separate competition brackets to accommodate both. Only basic knowledge of Python is necessary.</div>
                    <div className='question'>Q: What is this year's game about?</div>
                    <div className='answer'>This year’s game is Wifi Rumble, where teams’ algorithms will compete head-to-head to build cell towers on various maps and provide cell service to the greatest population.</div>
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
        };
    };

    changeTab(newTab: TabType) {
        this.setState({ tab: newTab });
    };

    renderTabs() {
        let tabs: Array<TabType> = ["schedule", "faq"];
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
