import React, {Component} from "react";
import classNames         from "./styles";
import imageOne           from "app/assets/images/img_cuadro1.jpg";
import imageTwo           from "app/assets/images/img_cuadro2.jpg";
import imageMarine        from "app/assets/images/img_faunaMarina.jpg";
import imageThree         from "app/assets/images/img_cuadro3.jpg";
import imageFour          from "app/assets/images/img_cuadro4.jpg";
import imageFive          from "app/assets/images/img_cuadro5.jpg";

export default class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  render () {
    return (
      <div>
        {this._renderHeader()}
        {this._renderMain()}
        {this._renderCoralReef()}
        {this._renderChallenge()}
        {this._renderChallengeExtra()}
        {this._renderFooter()}
      </div>
    )
  }


  _renderHeader () {
    return (
      <div className={classNames.header}>
        <div className={classNames.headerLogo}>
          <div className={classNames.headerLogoImg}></div>
        </div>
        <div className={classNames.headerLogin}>
          <form onSubmit={this._handleSubmit.bind(this)}>
            <div className={classNames.headerUsername}>
                <input value={this.state.email} onChange={this._handleEmailChange.bind(this)}
                  type="text" placeholder="Username" name="username" />
            </div>
            <div className={classNames.headerPassword}>
                <input value={this.state.password} onChange={this._handlePasswordChange.bind(this)}
                  type="password" placeholder="Password" name="password"/>
            </div>
            <div className={classNames.headerSubmit}>
              <input type="submit" value="Login" />
            </div>
            <div className={classNames.headerError}>
              {this._renderAuthenticationErrors()}
            </div>
          </form>
        </div>
      </div>
    )
  } 
   
  _renderMain () {
    return (
      <div className={classNames.main}>
        <div className={classNames.mainTitle}>Yokwe, Hafa Adai, Tirow, Alli Mogethin, Ran Allim, Kaselehlia, Len Wo and Greetings.</div>
        <div className={classNames.mainContent}><div className={classNames.mainContentImg}></div></div>
        <div className={classNames.mainFooter}>
          <div className={classNames.mainFooterLeft}>
            <div className={classNames.mainFooterLeftText}>
              The Micronesia Coral-Reef Monitoring Database Project
            </div>
          </div>
          <div className={classNames.mainFooterRight}>
            <div className={classNames.mainFooterRightText}>
              What is the Micronesia Challenge?
            </div>
          </div>
        </div>
      </div>
    )
  }

  _renderCoralReef () {
    return (
      <div className={classNames.mainReef}>
        <div className={classNames.mainReefSk}>
          <div className={classNames.colLeft}></div>
          <div className={classNames.colRight}>
            <h2>The Micronesia Coral-Reef Monitoring Database Project</h2>
            <p>
              The Micronesia coral-reef monitoring database was established to provide a standardized, safe, and accessible platform to hold our growing regional datasets.  This project was initially developed in support of the Micronesia Challenge (provide link to second landing page).  This site was developed for three users. General audiences can download the source code for our online database structure and species metadata tables, as well as review the information about our project.  Report users have access to the data being collected in standardized formats.  Admin users are responsible for maintaining the website, updating metadata tables as needed, and uploading new data that is generated. 
            </p>
            <p>
              For information regarding the design, framework, or source code for this database, contact Dr. Peter Houk (micronesiareefmonitoring@gmail.com).  Source code for the database is freely available at XXXX.
            </p>
            <h3>The Micronesia Coral-Reef Monitoring Database Project</h3>
            <ul>
              <li><a href="#">Coral data entry sheet</a></li>
              <li><a href="#">Fish data entry sheet</a></li>
              <li><a href="#">Macroinvertebrate data entry sheet</a></li>
              <li><a href="#">Fish metadata</a></li>
            </ul>
            <h3>Want to check out our latest metadata sheets?</h3>
            <ul>
              <li><a href="#">Coral metadata</a></li>
              <li><a href="#">Macroinvertebrate metadata</a></li>
              <li><a href="#">Site metadata</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  _renderChallenge () {
    return (
      <div className={classNames.mainChallenge}>
        <div className={classNames.mainChallengeHeader}></div>
        <div className={classNames.mainChallengeSk}>
          <div className={classNames.mainChallengeTop}></div>
          <div className={classNames.mainChallengeSkMiddle}>
            <div className={classNames.mainChallengeSkMiddleTitle}>
              <h2>What is the Micronesia Challenge?</h2>
            </div>
            <div className={classNames.mainChallengeSkMiddleText}>
              <p>
                The Micronesian Challenge (MC) represents a locally-driven conservation movement that was originated and perpetuated by the political leaders of Micronesia.  The challenge is for jurisdictions to meet effective conservation thresholds across 30% of their marine resources and 20% of their terrestrial resources by 2020.  Through the MC, several smaller working groups were created to facilitate progress and create relevant, regional networks.  This process has led to the creation of the MC marine measures group (photo of this group in folder provided), which has been highly influential to successful, standardized coral-reef monitoring activities across Micronesia.
              </p>
            </div>
          </div>
          <div className={classNames.mainChallengeSkBottom}></div>
          <div className={classNames.mainChallengeSkButton}>
            <div className={classNames.mainChallengeSkButton1}></div>
            <div className={classNames.mainChallengeSkButton2}></div>
            <div className={classNames.mainChallengeSkButton3}></div>
          </div>
         
        </div>
      </div>
    )
  }

  _renderChallengeExtra () {
      return (
        <div className={classNames.mainChallengeExtra}>
          <div className={classNames.mainChallengeExtraSk}>
            <div className={classNames.oneColumn}>
              <h2>Effective Conservation of Coral-Reef Habitats?</h2>
            </div>
            <div className={classNames.oneColumn}>
              <div className={classNames.oneColumnLeft}>
                <p>Defining effective conservation was one of the first steps the measures working group approached.  Through time, effective conservation for each monitoring site was considered if natural disturbance and recovery cycles occurred at expected timeframes, and expected recovery trajectories existed (see figure below).  Local stressors such as fishing and pollution serve to slow recovery, or even stop the recovery trajectories.  This forms the ultimate measure of effective conservation defined by the group.</p>
              </div>
              <div className={classNames.oneColumnRight}>
                <p>However, standardized data for years would be required to make this assessment.  So, an interim measure of effective conservation was defined until time-series data become available.  Effective conservation was based upon spatial analyses, whereby all sites would be judged against the highest quality site in a similar habitat.  Sites were scored based upon a series of metrics that together defined health of the overall reef ecosystem.  This was akin to blood pressure, cholesterol, heart rate together describing our health (see figure below).</p>
              </div>
            </div>
            <div className={classNames.oneColumn}>
              <img src={imageOne} width="840px"/>
            </div>
            <div className={classNames.oneColumn}>
              <div className={classNames.oneColumnLeft}>
                <p>The results from the most recent assessment were a bit daunting, revealing that only 42 percent of the major reef habitats across Micronesia exceeded the thresholds established for the Micronesia Challenge.  Understanding current health was a key component of this research, but the study went on to evaluate why reefs in some localities were not as healthy as others.  More specifically, the study examined if coral-reef status was due to natural environments or human stressors because we can only manage human stressors.</p>
                <p>For several islands with low human populations, such as Rota in the Mariana Islands and Namdrik Atoll in the Marshall Islands, wave energy alone was the best predictor of coral-reef condition, and so reefs were considered to be more-or-less in a natural state, and healthy.  However, for the majority of islands with larger human populations, fishing pressure acting alone on the outer reefs, or in combination with pollution in some lagoons, was the best predictor of more than 50 percent of the reefs examined.  These results highlighted the ecological roles that healthy fisheries contribute to overall ecosystem function.  When examined deeper, it was the absence of predators and large herbivores on reefs that was the strongest factor leading to the dominance of algae cover.  Both have key functional roles that are threatened.  Also interesting was the finding that the majority of marine protected areas across Micronesia are not currently living up to their full potential.  This could be due to poor placement and natural factors, but was more likely a consequence of insufficient enforcement given that the fewer successful MPA’s were associated with dedicated community-based enforcement.
                  <a href="http://journals.plos.org/plosone/article?id=10.1371/journal.pone.0130823" target="_blank">Download the full study and examine trends for each island jurisdiction (lead into last figure below)</a>
                </p>
                <div className={classNames.oneColumn}>
                  <img src={imageMarine} width="100%"/>
                </div>  
                
              </div>
              <div className={classNames.oneColumnRight}>
                <img src={imageTwo} width="410px"/>
                <p>Striking a balance between harvesting large herbivores and predators and allowing for their functional roles in the ecosystem is a major challenge facing reefs in Micronesia.</p>
              </div>
            </div>
   
            <div className={classNames.oneColumn}>
              <h2>Monitoring Designs</h2>
                <div className={classNames.oneColumnLeft}>
                  <p>Monitoring designs were developed based upon clear, concise questions of greatest importance to regional stakeholders.  These question operate at varying spatial and temporal scales, yet they are all rooted in a site-based design (i.e., the least common denominator, Figure 1).  It was imperative for designs to answer individual site-level questions (i.e., MPA effectiveness), as well as evaluate regional conservation movements (i.e., the Micronesian Challenge).</p>
                  <p>In order to develop a single program that can address the suite of questions noted above, a site-based design was essential.  When addressing questions at larger spatial scales, it is imperative that sites were selected around each island, across all major environmental and management regimes (Figure 2).  Taking this approach, site-based designs can then be scale up to the island and regional level.  This has resulted in approximately 20 sites being selected on each island, with variation (higher and lower) based upon the size of each island.</p>
                </div>
                <div className={classNames.oneColumnRight}>
                  <img src={imageThree} width="100%"/>
                  <p className={classNames.imgFooterText}>Figure 1.  Diagram of the question-driven monitoring process with respect to spatial and temporal scales of investigation.</p>                
                </div>
                <div className={classNames.oneColumn}>
                  <img src={imageFour} width="100%"/>
                </div>
                 <div className={classNames.oneColumn}>
                   <p className={classNames.imgFooterText}>Figure 2.  Site-based designs associated with regional monitoring, and how they scale up to answer regional questions through time (left).  Monitoring design for Chuuk, FSM, across reeftypes, island geography, management regimes, and wave exposure (right).</p>
                </div>
            </div>

            <div className={classNames.oneColumn}>
              <h2>Benefits of a shared, standardized monitoring design</h2>
                <div className={classNames.oneColumnLeft}>
                  <p>There have been many benefits of our shared, standardized monitoring designs that facilitated the very successful accomplishments of all milestones.  Key benefits of the shared design have included integrated data analysis workshops and trainings, development of standardized online databases, and common approaches for developing outreach materials (Figure 3).  These benefits are highlighted in the standardized evaluation process for Micronesian reefs below.</p>
                  <p className={classNames.imgFooterText}>Figure 3.  Benefits of a shared, standardized monitoring program: shared learning on data analysis training (left), creation of an online database to access the latest QA/QC data (middle), and common approaches towards disseminating information to stakeholders (right).</p>
                </div>
                <div className={classNames.oneColumnRight}>
                  <img src={imageFive} width="100%"/>
                </div>
            </div>         

          </div>
        </div>
      )
  }

  _renderFooter () {
    return (
      <div className={classNames.footer}>
        <div className={classNames.footerTop}>
          <div className={classNames.contentImg}>
          </div>
        </div>
      </div>
      )
  }

  _renderAuthenticationErrors () {
    if (this.props.authenticationError) {
      return <div>{this.props.authenticationError.errorMessage}</div>
    }
  }

  _handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit({email: this.state.email, password: this.state.password});
  }

  _handleEmailChange (event) {
    this.setState({email: event.target.value});
  }

  _handlePasswordChange (event) {
    this.setState({password: event.target.value});
  }

}