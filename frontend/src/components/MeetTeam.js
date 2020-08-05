import React, { Component } from "react";
export default class MeetTeam extends Component {
  render() {
    return (
      <div className="aboutus">
        <h1 className="aboutTitle">Meet The Team</h1>
        <div className="usinfo">
          <div className="roy">
            <h1>Roy Gutierrez</h1>
            <p>From: Miami, FL</p>
            <div className="githubLinkedIn">
              <a href="https://github.com/rmg2995" target="_blank">
                GitHub
              </a>
              <div>|</div>
              <a href="https://www.linkedin.com/in/rmg2995/" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="valerie">
            <h1>Matthew Manzo</h1>
            <p>From: Davie, FL</p>
            <div className="githubLinkedIn">
              <a href="https://github.com/mattjmanzo" target="_blank">
                GitHub
              </a>
              <div>|</div>
              <a
                href="https://www.linkedin.com/in/matthewjmanzo"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
