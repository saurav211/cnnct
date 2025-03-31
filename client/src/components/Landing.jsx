import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import logo from "../assets/logo.png";
import screen1 from "../assets/screen 1.png";
import screen3 from "../assets/screen 3.png";
import fantastical from "../assets/Fantastical 1.png";
import frame4 from "../assets/Frame (4).png";
import frame5 from "../assets/Frame (5).png";
import testimonials from "../assets/testimonials.png";
import audiomack from "../assets/audiomack.png";
import bandsintown from "../assets/bandsintown.png";
import bonfire from "../assets/bonfire.png";
import books from "../assets/books.png";
import buymeagift from "../assets/buymeagift.png";
import cameo from "../assets/cameo.png";
import clubhouse from "../assets/clubhouse.png";
import community from "../assets/community.png";
import contactdetails from "../assets/contactdetails.png";
import xLogo from "../assets/x.png";
import instaLogo from "../assets/insta.png";
import youtubeLogo from "../assets/youtube.png";
import musicLogo from "../assets/music.png";
import footerLogo from "../assets/Connect-footerlogo.png";

const Landing = () => {
  const cards = [1, 2, 3, 3];
  return (
    <div className="landing-container">
      <header className="landing-header">
        <img src={logo} alt="CNNCT Logo" className="landing-logo" />
        <div className="landing-header-buttons">
          {/* <Link to="/login">
            <Button label="Login" className="p-button-outlined" />
          </Link> */}
          <Link to="/signup">
            <Button label="Sign up free" rounded className="p-button-primary" />
          </Link>
        </div>
      </header>

      <main className="landing-main">
        <h1>
          CNNCT – Easy
          <br />
          Scheduling Ahead
        </h1>
        <Link to="/signup">
          <Button label="Sign up free" rounded className="p-button-primary" />
        </Link>

        {/* Main Image */}
        <div className="landing-main-image-container">
          <img
            src={screen1}
            alt="Calendar Screen"
            className="landing-main-image"
          />
        </div>
        <div>
          <h1 className="simplified">
            Simplified scheduling for you and your team
          </h1>
          <div>
            <p>
              {" "}
              CNNCT eliminates the back-and-forth of scheduling meetings so you
              can focus on what matters. Set your availability, share your link,
              <br />
              and let others book time with you instantly.
            </p>
          </div>
          <div className="landing-section">
            <div className="landing-text">
              <h2>
                Stay Organized with Your <br /> Calendar & Meetings
              </h2>
              <div>Seamless Event Scheduling</div>
              <ul>
                <li>
                  View all your upcoming meetings and appointments in one place.
                </li>
                <br />
                <li>
                  Syncs with Google Calendar, Outlook, and iCloud to avoid
                  conflicts.
                </li>
                <br />
                <li>
                  Customize event types: one-on-ones, team meetings, group
                  sessions, and webinars.
                </li>
              </ul>
            </div>

            <div className="landing-images">
              <img
                src={fantastical}
                alt="Calendar View 1"
                className="calendar-image-1"
              />
              <img
                src={screen3}
                alt="Calendar View 2"
                className="calendar-image-2"
              />
            </div>
          </div>
        </div>

        <div className="testimonial-section">
          <h2>
            Here's what our <span className="highlight">customer</span> has to
            say
          </h2>
          <Button rounded outlined className="read-stories-button">
            Read customer stories
          </Button>
          <div className="testimonial-cards">
            {cards.map((val) => {
              return (
                <div className="testimonial-card">
                  <h3>Amazing tool! Saved me months</h3>
                  <p>
                    This is a placeholder for your testimonials and what your
                    client has to say, put them here and make sure it's 100%
                    true and meaningful.
                  </p>
                  <div className="testimonial-author">
                    <div className="author-avatar"></div>
                    <div>
                      <div>John Master</div>
                      <div>Director, Spark.com</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="link-apps-section">
          <h2>All Link Apps and Integrations</h2>
          <div className="link-apps-grid">
            <div className="link-app">
              <img src={audiomack} alt="Audiomack" />
              <p>
                <div>Audiomack</div>
                Add an Audiomack player to your Linktree
              </p>
            </div>
            <div className="link-app">
              <img src={bandsintown} alt="Bandsintown" />
              <p>
                <div>Bandsintown</div>
                Drive ticket sales by listing your events
              </p>
            </div>
            <div className="link-app">
              <img src={bonfire} alt="Bonfire" />
              <p>
                <div>Bonfire</div>
                Display and sell your custom merch
              </p>
            </div>
            <div className="link-app">
              <img src={books} alt="Books" />
              <p>
                <div>Books</div>
                Promote books on your Linktree
              </p>
            </div>
            <div className="link-app">
              <img src={buymeagift} alt="Buy Me A Gift" />
              <p>
                <div>Buy Me A Gift</div>
                Let visitors support you with a small gift
              </p>
            </div>
            <div className="link-app">
              <img src={cameo} alt="Cameo" />
              <p>
                <div>Cameo</div>
                Make impossible fan connections possible
              </p>
            </div>
            <div className="link-app">
              <img src={clubhouse} alt="Clubhouse" />
              <p>
                <div>Clubhouse</div>
                Let your community in on the conversation
              </p>
            </div>
            <div className="link-app">
              <img src={community} alt="Community" />
              <p>
                <div>Community</div>
                Build an SMS subscriber list
              </p>
            </div>
            <div className="link-app">
              <img src={contactdetails} alt="Contact Details" />
              <p>
                <div>Contact Details</div>
                Easily share downloadable contact details
              </p>
            </div>
          </div>
        </div>
        <footer className="footer">
          <div className="footer-top">
            <div className="footer-buttons">
              <Link to={"/login"}>
                <Button outlined rounded className="footer-login-button">
                  Log in
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button rounded className="footer-signup-button">
                  Sign up free
                </Button>
              </Link>
            </div>
            <div className="footer-links">
              <div>
                <p>About CNNCT</p>
                <p>Blog</p>
                <p>Press</p>
                <p>Social Good</p>
                <p>Contact</p>
              </div>
              <div>
                <p>Careers</p>
                <p>Getting Started</p>
                <p>Features and How-Tos</p>
                <p>FAQs</p>
                <p>Report a Violation</p>
              </div>
              <div>
                <p>Terms and Conditions</p>
                <p>Privacy Policy</p>
                <p>Cookie Notice</p>
                <p>Trust Center</p>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p className="footer-acknowledgment">
              We acknowledge the Traditional Custodians of the land on which our
              office stands, The Wurundjeri
              <br /> people of the Kulin Nation, and pay our respects to Elders
              past, present and emerging.
            </p>
            <div className="footer-icons">
              <img src={xLogo} alt="X Logo" />
              <img src={instaLogo} alt="Instagram Logo" />
              <img src={youtubeLogo} alt="YouTube Logo" />
              <img src={musicLogo} alt="Music Logo" />
              <img src={footerLogo} alt="Connect Footer Logo" />
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;
