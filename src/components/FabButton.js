import React, { Component } from 'react';
import { FAB, Portal } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import { deleteAll } from '../actions/actionFirebase';
import { connect } from 'react-redux';

class FabButton extends Component {
    state = {
        open: false,
      };
    
      render() {

        const { nameCustomer } = this.props;
        return (
          <Portal>
            <FAB.Group
              open={this.state.open}
              icon={this.state.open ? 'help-outline' : 'priority-high'}
              actions={[
                { icon: 'done-all', label: 'Pagar todos!', onPress: () => this.props.deleteAll(nameCustomer)},
                { icon: 'local-atm', label: 'Adicionar', 
                    onPress: () => Actions.ModalAddValue(
                        { nameCustomer: this.props.nameCustomer })
                },
              ]}
              onStateChange={({ open }) => this.setState({ open })}
              onPress={() => {
                if (this.state.open) {
                  // do something if the speed dial is open
                }
              }}
            />
          </Portal>
        );
      }
}
export default connect(
  null, { 
    deleteAll,
   }
)(FabButton);
