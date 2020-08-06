import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup
} from '@material-ui/core';
import React, { useContext } from 'react';
import { ConfigContext } from '../containers/App';

export function SettingsDialog({ open, onClose }: { open: boolean, onClose: () => void }) {
  const { config, setConfig } = useContext(ConfigContext);

  console.log(config);
  const togglePronunciation = () => setConfig({ ...config, showPronunciations: !config.showPronunciations });
  const toggleDefinitions = () => setConfig({ ...config, showDefinitions: !config.showDefinitions });

  return (
    <Dialog aria-labelledby="simple-dialog-title" onClose={ onClose } open={open}>
      <DialogTitle id="simple-dialog-title">Settings</DialogTitle>
        <DialogContent>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.showPronunciations}
                  onChange={togglePronunciation}/>}
              label="Show pronunciations"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={config.showDefinitions}
                  onChange={toggleDefinitions}/>}
              label="Show definitions"
            />
          </FormGroup>
        </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
