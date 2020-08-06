import React, { useContext, useState } from 'react';
import { AppBar, Box, Container, Icon, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { remote } from 'electron';
import WordsTable, { TableWord } from './WordsTable';
import FiltersInput from './FiltersInput';
import { ApiWord, Filter, filterQueries, phonemeMap, posCodes } from '../constants/types';
import { ConfigContext } from '../containers/App';
import { SettingsDialog } from './Settings';

const useStyles = makeStyles((theme) => ({
  logo: {
    fontFamily: 'monospace',
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
    flex: 1
  },
  queries: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: 0
  },
  container: {
    display: 'flex',
    flexDirection: 'column'
  },
  footer: {
    padding: theme.spacing(1)
  }
}));

const API_ROOT = 'https://api.datamuse.com/words?';

export default function Home(): JSX.Element {
  const classes = useStyles();

  const [words, setWords] = useState<Array<TableWord> | undefined>([]);

  const processWords = (apiWords: Array<ApiWord>) => {
    setWords(apiWords.map(word => {
      const ipa = word.tags
        .find(tag => tag.startsWith('ipa_pron'))
        .substring(9);
      const phonemes = word.tags
        .find(tag => tag.startsWith('pron'))
        .substring(5).replace(/[0-9]/gi, '').trim().split(' ')
        .map(phoneme => phonemeMap[phoneme]).join('-');

      const meanings = word.defs
        ? word.defs
          .map(def => def.split('\t'))
          .map(([posCode, def]) => ({ partOfSpeech: posCodes[posCode], definition: def }))
        : undefined;

      console.log(meanings);
      return {
        word: word.word,
        meanings,
        ipa,
        phonemes,
        score: word.score
      } as TableWord;
    }));
  };

  const onFiltersChanged = (filters: Array<Filter>) => {
    if (!filters.length) {
      setWords(undefined);
      return;
    }

    const query =
      API_ROOT +
      filters
        .map((filter) => `${filterQueries.get(filter.type)}=${filter.query}`)
        .concat(['max=1000'])
        .concat(['md=dr'])
        .concat(['ipa=1'])
        .join('&');

    fetch(query)
      .then((res) => res.json())
      .then(processWords)
      .catch(console.error);
  };

  const closeApp = () => remote.getCurrentWindow().hide();

  const [ settingsOpen, setSettingsOpen ] = useState(false);
  const showSettings = () => setSettingsOpen(true);
  const hideSettings = () => setSettingsOpen(false);

  window.addEventListener("keydown", (event) => {
    if(event.code == "Escape")
      closeApp();
  });

  return (
    <Box height="100%" className={classes.container}>
      <AppBar position="sticky">
        <Toolbar className="draggable">
          <Icon fontSize="large">translate</Icon>
          <Typography variant="h6" className={classes.logo}>
            Lexi
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={showSettings}
            tabIndex={-1}
            className="not-draggable"
          >
            <Icon>settings</Icon>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={closeApp}
            tabIndex={-1}
            className="not-draggable"
          >
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
        <FiltersInput onFiltersChanged={onFiltersChanged}/>
      </AppBar>
      <SettingsDialog open={settingsOpen} onClose={hideSettings}/>
      {words !== undefined && (
        <Box style={{ overflow: 'auto', flexGrow: 1, scrollBehavior: 'smooth' }}>
          <WordsTable words={words}/>
        </Box>
      )}
      {words !== undefined && (
        <Paper square className={classes.footer} variant="outlined">
          <Typography variant="subtitle2" color="inherit">
            {`${words.length} results`}
          </Typography>
        </Paper>
      )}
      {words === undefined && (
        <Container style={{ textAlign: 'center', color: '#bbb' }}>
          <Typography variant="h5" color="inherit">
            search for some words!
          </Typography>
        </Container>
      )}
    </Box>
  );
}
