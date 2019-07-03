import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faBriefcase,
  faUniversity,
  faMapMarkerAlt,
  faHeart,
  faAddressBook,
  faTransgenderAlt,
  faBirthdayCake
} from '@fortawesome/free-solid-svg-icons';

const About = ({ user }) => {
  const [tab, setTab] = useState(0);
  return (
    <div className="about__container">
      <div className="about-title">
        <FontAwesomeIcon icon={faUser} />
        <label>About</label>
      </div>
      <div className="about-content">
        <div className="about-menu">
          <div className={tab === 0 ? 'active' : ''} onClick={() => setTab(0)}>
            Overview
          </div>
          <div className={tab === 1 ? 'active' : ''} onClick={() => setTab(1)}>
            Work & Education
          </div>
          <div className={tab === 2 ? 'active' : ''} onClick={() => setTab(2)}>
            Places
          </div>
          <div className={tab === 3 ? 'active' : ''} onClick={() => setTab(3)}>
            Contact & Basic infos
          </div>
          <div className={tab === 4 ? 'active' : ''} onClick={() => setTab(4)}>
            Family & relationship
          </div>
          <div className={tab === 5 ? 'active' : ''} onClick={() => setTab(5)}>
            Details
          </div>
        </div>
        <div className="about-infos">
          {
            {
              0: (
                <div className="infos-overview">
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    {user.workplace ? (
                      <div className="info">Work at {user.workplace}</div>
                    ) : (
                      <div className="unknown">No workplaces to show</div>
                    )}
                  </div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faUniversity} />
                    </div>
                    {user.school ? (
                      <div className="info">Studied at {user.school}</div>
                    ) : (
                      <div className="unknown">No schools to show</div>
                    )}
                  </div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    {user.places ? (
                      <div className="info">Lived at {user.places}</div>
                    ) : (
                      <div className="unknown">No places to show</div>
                    )}
                  </div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faHeart} />
                    </div>
                    {user.relationship ? (
                      <div className="info">
                        In a relationship with {user.workplace}
                      </div>
                    ) : (
                      <div className="unknown">
                        No relationship info to show
                      </div>
                    )}
                  </div>
                </div>
              ),
              1: (
                <div className="infos-work">
                  <div className="infos_title">WORK</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    {user.workplace ? (
                      <div className="info">Work at {user.workplace}</div>
                    ) : (
                      <div className="unknown">No workplaces to show</div>
                    )}
                  </div>
                  <div className="infos_title">EDUCATION</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faUniversity} />
                    </div>
                    {user.school ? (
                      <div className="info">Studied at {user.school}</div>
                    ) : (
                      <div className="unknown">No schools to show</div>
                    )}
                  </div>
                </div>
              ),
              2: (
                <div className="infos-places">
                  <div className="infos_title">PLACES</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faMapMarkerAlt} />
                    </div>
                    {user.places ? (
                      <div className="info">Lived at {user.places}</div>
                    ) : (
                      <div className="unknown">No places to show</div>
                    )}
                  </div>
                </div>
              ),
              3: (
                <div className="infos-contact">
                  <div className="infos_title">Contact</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faAddressBook} />
                    </div>
                    <div className="info">{user.email}</div>
                  </div>
                  <div className="infos_title">BASIC INFORMATIONS</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faTransgenderAlt} />
                    </div>
                    {user.gender ? (
                      <div className="info">{user.gender}</div>
                    ) : (
                      <div className="unknown">Unknown</div>
                    )}
                    <div className="icon">
                      <FontAwesomeIcon icon={faBirthdayCake} />
                    </div>
                    {user.gender ? (
                      <div className="info">{user.Birthday}</div>
                    ) : (
                      <div className="unknown">Unknown</div>
                    )}
                  </div>
                </div>
              ),
              4: (
                <div className="infos-family">
                  <div className="infos_title">RELATIONSHIP</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBriefcase} />
                    </div>
                    {user.relationship ? (
                      <div className="info">In a relationship with {user.relationship}</div>
                    ) : (
                      <div className="unknown">No relationship to show</div>
                    )}
                  </div>
                  <div className="infos_title">FAMILY</div>
                  <div className="info__container">
                    <div className="icon">
                      <FontAwesomeIcon icon={faUniversity} />
                    </div>
                    {user.family ? (
                      <div className="info">{user.family}</div>
                    ) : (
                      <div className="unknown">No family members to show</div>
                    )}
                  </div>
                </div>
              ),
              5: <div className="infos-details">
                  <div className="infos_title">{`ABOUT ${user.username.toUpperCase()}`}</div>
                  <div className="info__container">
                    {user.about ? (
                      <div className="info">{user.about}</div>
                    ) : (
                      <div className="unknown">No additional details to show</div>
                    )}
                  </div>
                  <div className="infos_title">FAVORITE QUOTES</div>
                  <div className="info__container">
                    {user.quote ? (
                      <div className="info">{user.quote}</div>
                    ) : (
                      <div className="unknown">No favorite quotes to show</div>
                    )}
                  </div></div>
            }[tab]
          }
        </div>
      </div>
    </div>
  );
};

export default About;
