import * as React from 'react';
import Typography from '@material-ui/core/Typography';

interface Props {
  backupErrorRenderComponent?: React.ReactElement;
  setHasUnsavedChanges?: (bool: boolean) => void;
}

class ErrorBoundary extends React.Component<Props> {
  state = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: any) {
    if (this.props.setHasUnsavedChanges) {
      this.props.setHasUnsavedChanges(false);
    }
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps !== this.props && prevState.error) {
      if (this.props.setHasUnsavedChanges) {
        this.props.setHasUnsavedChanges(true);
      }
      this.setState({
        error: null,
        errorInfo: null,
      });
    }
  }

  render() {
    if (this.state.errorInfo) {
      if (this.props.backupErrorRenderComponent) {
        return this.props.backupErrorRenderComponent;
      } else {
        return (
          <div>
            <Typography variant="h4">
              The theme property you set is not valid
            </Typography>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
