import { Button, Checkbox, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import React from 'react'

import { AppToaster } from '../toaster'
import { loadSettings, persistSettings } from '../utils'

export default class Basic extends React.Component<BasicSettingProps, BasicSettingState> {
  state = {
    userId: '',
    externalAuthToken: '',
    autoOpenDebugger: false
  }

  componentDidMount() {
    const { userId, externalAuthToken } = this.props.store.config
    const { autoOpenDebugger } = loadSettings()

    this.setState({ userId, externalAuthToken, autoOpenDebugger })
  }

  saveSettings = () => {
    this.props.store.mergeConfig({
      userId: this.state.userId,
      externalAuthToken: this.state.externalAuthToken
    })

    persistSettings({ autoOpenDebugger: this.state.autoOpenDebugger })
    AppToaster.show({ message: 'Configuration updated successfully!', intent: Intent.SUCCESS, timeout: 3000 })
  }

  handleUserIdChanged = event => this.setState({ userId: event.target.value })
  handleAuthChanged = event => this.setState({ externalAuthToken: event.target.value })
  handleAutoOpenChanged = event => this.setState({ autoOpenDebugger: event.target.checked })

  render() {
    return (
      <div>
        <Checkbox
          label="Automatically open the Debugger when the emulator is displayed"
          checked={this.state.autoOpenDebugger}
          onChange={this.handleAutoOpenChanged}
        />

        <FormGroup label="User ID" helperText={'Changes the User ID stored on your browser'}>
          <InputGroup value={this.state.userId} onChange={this.handleUserIdChanged} placeholder="Your User ID" />
        </FormGroup>

        <FormGroup label="External Auth Token" helperText={'It must be a valid JWT Token'}>
          <InputGroup
            value={this.state.externalAuthToken}
            onChange={this.handleAuthChanged}
            placeholder="Token generated from your system"
          />
        </FormGroup>

        <Button onClick={this.saveSettings} intent={Intent.PRIMARY}>
          Save
        </Button>
      </div>
    )
  }
}

interface BasicSettingProps {
  store: any
}

interface BasicSettingState {
  userId: string
  externalAuthToken: string
  autoOpenDebugger: boolean
}
