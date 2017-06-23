import React, {Component} from 'react';
import PropTypes from 'prop-types';

import PrinterMenuActions from '../actions/PrinterMenuActions';
import PrinterMenuStore from '../stores/PrinterMenuStore';
import PrinterActionLabels from '../stores/PrinterActionLabels';
import PrinterButton from './PrinterButton';


class PrinterMenu extends Component {
  constructor(props) {
    super(props);

    this.state = PrinterMenuStore.getState();
    this.onPrinterMenu = this.onPrinterMenu.bind(this);
    this.sendAction = this.sendAction.bind(this);
  }

  componentDidMount() {
    PrinterMenuStore.listen(this.onPrinterMenu);
  }

  componentWillUnmount() {
    PrinterMenuStore.unlisten(this.onPrinterMenu);
  }

  onPrinterMenu(state) {
    this.setState(state);
  }

  onClick() {
    PrinterMenuActions.toggleMenuPanel();
  }

  sendAction(action) {
    this.props.onSendAction(action);
  }

  render() {
    let menu = null;
    let menuPanel = null;

    if (this.state.menuPanelVisible) {

      menuPanel = <div className="printer_actions">
               {this.state.actions.map((action) =>
                 <PrinterButton
                  key={action}
                  action={action}
                  label={PrinterActionLabels[action]}
                  onSendAction={this.sendAction} />
               )}
             </div>;
    }

    if (this.state.menuVisible) {
      menu = <div className="printer_menu">
               <svg className="gear_icon" width="20" height="20" onClick={this.onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 268.765 268.765">
                 <path d="M267.92 119.461c-0.425-3.778-4.83-6.617-8.639-6.617 -12.315 0-23.243-7.231-27.826-18.414 -4.682-11.454-1.663-24.812 7.515-33.231 2.889-2.641 3.24-7.062 0.817-10.133 -6.303-8.004-13.467-15.234-21.289-21.5 -3.063-2.458-7.557-2.116-10.213 0.825 -8.01 8.871-22.398 12.168-33.516 7.529 -11.57-4.867-18.866-16.591-18.152-29.176 0.235-3.953-2.654-7.39-6.595-7.849 -10.038-1.161-20.164-1.197-30.232-0.08 -3.896 0.43-6.785 3.786-6.654 7.689 0.438 12.461-6.946 23.98-18.401 28.672 -10.985 4.487-25.272 1.218-33.266-7.574 -2.642-2.896-7.063-3.252-10.141-0.853 -8.054 6.319-15.379 13.555-21.74 21.493 -2.481 3.086-2.116 7.559 0.802 10.214 9.353 8.47 12.373 21.944 7.514 33.53 -4.639 11.046-16.109 18.165-29.24 18.165 -4.261-0.137-7.296 2.723-7.762 6.597 -1.182 10.096-1.196 20.383-0.058 30.561 0.422 3.794 4.961 6.608 8.812 6.608 11.702-0.299 22.937 6.946 27.65 18.415 4.698 11.454 1.678 24.804-7.514 33.23 -2.875 2.641-3.24 7.055-0.817 10.126 6.244 7.953 13.409 15.19 21.259 21.508 3.079 2.481 7.559 2.131 10.228-0.81 8.04-8.893 22.427-12.184 33.501-7.536 11.599 4.852 18.895 16.575 18.181 29.167 -0.233 3.955 2.67 7.398 6.595 7.85 5.135 0.599 10.301 0.898 15.481 0.898 4.917 0 9.835-0.27 14.752-0.817 3.897-0.43 6.784-3.786 6.653-7.696 -0.451-12.454 6.946-23.973 18.386-28.657 11.059-4.517 25.286-1.211 33.281 7.572 2.657 2.89 7.047 3.239 10.142 0.848 8.039-6.304 15.349-13.534 21.74-21.494 2.48-3.079 2.13-7.559-0.803-10.213 -9.353-8.47-12.388-21.946-7.529-33.524 4.568-10.899 15.612-18.217 27.491-18.217l1.662 0.043c3.853 0.313 7.398-2.655 7.865-6.588C269.044 139.917 269.058 129.639 267.92 119.461zM134.595 179.491c-24.718 0-44.824-20.106-44.824-44.824 0-24.717 20.106-44.824 44.824-44.824 24.717 0 44.823 20.107 44.823 44.824C179.418 159.385 159.312 179.491 134.595 179.491z"/>
               </svg>
               {menuPanel}
             </div>
    }

    return menu;
  }
}

PrinterMenu.propTypes = {
  onSendAction: PropTypes.func.isRequired
};

export default PrinterMenu;