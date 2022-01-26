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
            tab: "faq",
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
                            <div className="entry">12:30 Lunch Served</div>
                            <div className="entry">6:00 Final Submission Due</div>
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
                    <div className="question">Q: But but what if I'm really really beginner, like really?</div>
                    <div className="answer">There will be two compeition brackets! One for beginners and another for experienced players.</div>       
                    <div className="question">Q: Will there be prizes or swag?</div>
                    <div className="answer">Yes there will be prizes, swag and t-shirts!</div>
                    <div className="question">Q: Who runs this event?</div>
                    <div className="answer">You can learn more about us ACM@CMU <a href="http://www.acmatcmu.com">over here.</a></div>
                </>
            );
        };
    };

    changeTab(newTab: TabType) {
        this.setState({ tab: newTab });
    };

    renderTabs() {
        let tabs: Array<TabType> = ["faq","schedule"];
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
