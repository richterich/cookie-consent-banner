export const config = {
  consent: {
    title: 'This Site uses cookies 🍪',
    description: `
      We use cookies to recognise your device and save the actions you have previously made on the Site, to prevent any malicious actions against the Site and its users, to improve users' experience as well as to ensure the proper functionality of the Site.<br/>
      <br/>
      For these reasons, we may share your usage data with third parties defined in our <a href="/cookies/" class="cc-link">Cookies Policy</a>. By clicking “Accept All”, you consent to store on your device all the technologies described in our <a href="/cookies/" class="cc-link">Cookies Policy</a> and <a href="/privacy/" class="cc-link">Privacy Policy</a>, while by clicking “Reject All”, you decline to store on your device marketing and statistical cookies. You can change your cookie settings at any time by clicking “Settings”.<br/>
      <br/>
      Please click on “Settings” to see further information.<br/>
      <br/>
      To find out more about the categories of personal data collected and the purposes for which such data will be used, read our <a href="/cookies/" class="cc-link">Cookies Policy</a>.
    `,
    primaryButton: 'Accept All',
    secondaryButton: 'Reject All',
    settingsButton: 'Settings'
  },
  settings: {
    title: 'Cookie Settings',
    primaryButton: 'Accept All',
    secondaryButton: 'Reject All',
    saveButton: 'Save Settings',
    closeButton: 'Close',
    cookieTableHeaders: {
      name: 'Name',
      provider: 'Provider',
      type: 'Type',
      purpose: 'Purpose',
      retention: 'Retention'
    },
    blocks: [
      {
        title: 'Cookie usage',
        description: `
          We use different types of cookies to optimise your experience on our Site. Click on the categories below to learn more about their purpose. You may choose which types of cookies to allow and can change your preferences at any time. However, be aware that if you choose to refuse or remove cookies, this could affect the availability and functionality of the Site. You can learn more about how we use cookies by reading our <a href="/privacy/" class="cc-link">Privacy Policy</a> and <a href="/cookies/" class="cc-link">Cookie Policy</a>.<br/>
          <br/>
          We use cookies in accordance with Article 6 GDPR based on the following grounds:<br/>
          <br/>
          a) consent of the user;<br/>
          b) legitimate interest of the Company.<br/>
          <br/>
          We collect the necessary cookies based on our legitimate interest, namely to ensure the functionality of the Site.
        `
      },
      {
        title: 'Categories of cookies',
        description: `
          <b>First-party</b> cookies are those cookies that are placed on the Site by the host of the domain.<br/>
          <br/>
          <b>Third-party</b> cookies are those that are placed on the Site by the domains other than the one the user is visiting. As a variety of features that are necessary to ensure the personalised and convenient experience of the user may not be delivered by the Site itself, the third-party cookies are used. We work with different third-party service providers in order to enhance your user experience and to analyse user behaviour on our Site.<br/>
          <br/>
          Third-party service providers may use their cookie files on our Site and you may find the relevant information about the use of cookies by them in their respective privacy documents. The list of the abovementioned service providers is the following:<br/>
          <br/>
          a) Google Analytics;<br/>
          b) Meta Pixel;<br/>
          c) Facebook;<br/>
          d) Twitter.<br/>
          <br/>
          We only use cookies for the following purposes:
        `
      },
      {
        title: 'Necessary Cookies',
        description: 'We use these cookies to enable the functionality of our Site. You can choose to block Necessary Cookies in your browser settings. Nevertheless, remember, if you block Necessary Cookies, it may strongly affect the functionality of the Site.',
        toggle: {
          value: 'necessary',
          enabled: true,
          readonly: true
        },
        cookieTable: [
          {
            name: 'consent',
            provider: '<Company Name>',
            type: '-',
            purpose: 'Store user preferences at the session',
            retention: 'Session'
          }
        ]
      },
      {
        title: 'Statistical Cookies',
        description: 'We would like to use them to understand how users interact with our Site (number of visits, behaviour) by collecting information anonymously.',
        toggle: {
          value: 'analytics',
          enabled: false,
          readonly: false
        },
        cookieTable: [
          {
            name: '-',
            provider: '-',
            type: '-',
            purpose: '-',
            retention: '-'
          }
        ]
      },
      {
        title: 'Marketing Cookies',
        description: 'These cookies and other tracking technologies are used to deliver relevant online advertising to you on other websites. These cookies are placed by us and selected third parties and enable adverts to be presented to you on third party websites.',
        toggle: {
          value: 'targeting',
          enabled: false,
          readonly: false
        },
        cookieTable: [
          {
            name: '-',
            provider: '-',
            type: '-',
            purpose: '-',
            retention: '-'
          }
        ]
      }
    ]
  }
}
