import React, { Component } from 'react';

interface Props {
  title: string;
}
export default class Test extends Component<Props> {
  render() {
    return <h1>{this.props.title}</h1>;
  }
}
