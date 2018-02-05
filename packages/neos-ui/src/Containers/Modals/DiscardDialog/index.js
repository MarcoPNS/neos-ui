import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {$get, $transform} from 'plow-js';

import Button from '@neos-project/react-ui-components/src/Button/';
import Dialog from '@neos-project/react-ui-components/src/Dialog/';
import Icon from '@neos-project/react-ui-components/src/Icon/';
import I18n from '@neos-project/neos-ui-i18n';

import {actions} from '@neos-project/neos-ui-redux-store';

import style from './style.css';

@connect($transform({
    nodesToBeDiscarded: $get('cr.workspaces.toBeDiscarded'),
}), {
    confirm: actions.CR.Workspaces.confirmDiscard,
    abort: actions.CR.Workspaces.abortDiscard
})
export default class DiscardDialog extends PureComponent {
    static propTypes = {
        nodesToBeDiscarded: PropTypes.object,
        confirm: PropTypes.func.isRequired,
        abort: PropTypes.func.isRequired
    };

    handleAbort = () => {
        const {abort} = this.props;

        abort();
    }

    handleConfirm = () => {
        const {confirm} = this.props;

        confirm();
    }

    renderTitle() {
        return (
            <div>
                <Icon icon="exclamation-triangle"/>
                <span className={style.modalTitle}>
                    <I18n id="content.components.discardAllDialog.discardAllChangesHeader" fallback="Delete"/>
                </span>
            </div>
        );
    }

    renderAbort() {
        return (
            <Button
                id="neos-DiscardDialog-cancel"
                key="cancel"
                style="lighter"
                hoverStyle="brand"
                onClick={this.handleAbort}
                >
                <I18n id="Neos.Neos:Main:cancel" fallback="Cancel"/>
            </Button>
        );
    }

    renderConfirm() {
        return (
            <Button
                id="neos-DiscardDialog-confirm"
                key="confirm"
                style="warn"
                hoverStyle="brand"
                onClick={this.handleConfirm}
                >
                <I18n id="Neos.Neos:Main:confirm" fallback="Confirm"/>
            </Button>
        );
    }

    render() {
        const {nodesToBeDiscarded} = this.props;
        if (!nodesToBeDiscarded) {
            return null;
        }

        return (
            <Dialog
                actions={[this.renderAbort(), this.renderConfirm()]}
                title={this.renderTitle()}
                onRequestClose={this.handleAbort}
                isOpen
                >
                <div className={style.modalContents}>
                    <I18n
                        id="Neos.Neos:Main:content.components.discardAllDialog.discardXChangesSubheader"
                        params={{numberOfChanges: nodesToBeDiscarded.count()}}
                        />
                </div>
            </Dialog>
        );
    }
}
