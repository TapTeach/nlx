document.addEventListener('DOMContentLoaded', () => {
  const waitFor = require('../utils/wait-for');
  const debounce = require('../utils/debounce');
  const getSiblings = require('../utils/get-siblings');
  const browserCanUseCssVariables = require('../utils/supports-css-variables');
  const lookingFor = '[data-tabs]';

  waitFor(lookingFor, () => {
    const header = document.querySelector('[data-header]');
    const attrTablist = '[data-tabs--tablist]';
    const attrPanels = '[data-tabs--panels]';
    const tabs = document.querySelectorAll('[data-tabs]');
    const tabsNav = document.querySelector('[data-tabs--nav]');
    const tabsTablist = document.querySelectorAll(attrTablist);
    const tabsTabs = document.querySelectorAll('[data-tabs--tab]');
    const tabsPanels = document.querySelectorAll('[data-tabs--panel]');
    const tabsSelect = document.querySelector('[data-tabs--select]');
    const tabList = [];

    function headerHeight() {
      const height = header.clientHeight;
      return height;
    }

    const tabsNavOffset = () => {
      const offset = headerHeight();

      if (browserCanUseCssVariables()) {
        tabsNav.style.setProperty('--headerOffset', `${offset}px`);
      } else {
        tabsNav.style.top = `${offset}px`;
      }
    };

    // deactivate sibling tabs and panels
    function deactivateSiblings(tab, panel) {
      const tabSiblings = getSiblings(tab);
      const panelSiblings = getSiblings(panel);

      tabSiblings.forEach(sibling => {
        sibling.setAttribute('aria-selected', 'false');
        sibling.setAttribute('tabindex', -1);
      });

      panelSiblings.forEach(sibling => {
        sibling.setAttribute('aria-hidden', 'true');
      });
    }

    // make sure first tab and panel are visible
    function getFirstTabPanel() {
      tabs.forEach(element => {
        const firstTab = element.querySelector(attrTablist).children[0];
        const firstPanel = element.querySelector(attrPanels).children[0];

        firstTab.setAttribute('aria-selected', true);
        firstTab.setAttribute('tabindex', 0);
        firstPanel.setAttribute('aria-hidden', false);

        deactivateSiblings(firstTab, firstPanel);
      });
    }

    // activate appropriate panel
    function activatePanel(elem, lookForId) {
      lookForId = typeof lookForId !== 'undefined' ? lookForId : true;
      const panelId = lookForId ? elem.getAttribute('aria-controls') : elem;
      const activatedTab = document.querySelector(`[aria-controls="${panelId}"]`);
      const activatedPanel = document.getElementById(panelId);

      // push hash change
      window.history.replaceState('', '', `#${panelId}`);

      deactivateSiblings(activatedTab, activatedPanel);

      if (activatedTab && activatedPanel) {
        activatedPanel.setAttribute('aria-hidden', 'false');
        activatedTab.setAttribute('aria-selected', 'true');
        activatedTab.setAttribute('tabindex', 0);
      }

      // activate appropriate select option
      if (tabsSelect) {
        tabsSelect.value = panelId;
      }

      // smooth scroll to selection
      window.nbApp.utils.scrollToSelector(tabs, headerHeight());
    }

    // navigate through tabs via keys
    function activatePanelByKey(event) {
      let target = null;
      const original = this;
      const prev = this.previousElementSibling;
      const next = this.nextElementSibling;

      switch (event.keyCode) {
        case 37:
          target = prev;
          break;
        case 39:
          target = next;
          break;
        default:
          target = false;
          break;
      }

      if (target) {
        original.setAttribute('aria-selected', false);
        original.setAttribute('tabindex', -1);
        target.setAttribute('aria-selected', true);
        target.setAttribute('tabindex', 0);
        target.focus();
        activatePanel(target);
      }
    }

    // when navigating with select
    function activatePanelBySelect() {
      const panelId = this.value;
      activatePanel(panelId, false);
    }

    // load appropriate panel by hash ID
    function activatePanelByHash() {
      const hash = document.location.hash;
      const panelId = hash.replace('#', '');

      if (hash && window.nbApp.utils.arrayIncludes(tabList, panelId)) {
        activatePanel(panelId, false);
      }
    }

    // make sure all tablists have appropriate role
    tabsTablist.forEach(list => {
      list.setAttribute('role', 'tablist');
    });

    // iterate over tabs
    tabsTabs.forEach(tab => {
      tabList.push(tab.getAttribute('aria-controls'));
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', false);
      tab.setAttribute('tabindex', -1);
      tab.addEventListener('keydown', activatePanelByKey, false);
      tab.addEventListener(
        'click',
        () => {
          activatePanel(tab);
        },
        false
      );
    });

    // iterate over tab-panels
    tabsPanels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-hidden', true);
    });

    // initialize first tab and panel for each tabs component
    getFirstTabPanel();

    // on load activate a tab panel by hashtag if hashtag present
    activatePanelByHash();

    // for mobile select clicks
    if (tabsSelect) {
      tabsSelect.addEventListener('change', activatePanelBySelect, false);
    }

    // activate panel as users browser forward/backwards
    window.onpopstate = () => {
      if (!window.nbApp.utils.hasHash()) getFirstTabPanel();
    };

    // on a hash changes, activate appropriate panel
    window.onhashchange = activatePanelByHash;

    tabsNavOffset();
    window.addEventListener('resize', debounce(tabsNavOffset, 250));
  });
});
