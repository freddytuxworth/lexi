import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Meaning, PartOfSpeech } from '../constants/types';
import { ConfigContext } from '../containers/App';

export type TableWord = {
  word: string,
  meanings: Array<Meaning>
  phonemes: string,
  ipa: string,
  score: number
};

const useStyles = makeStyles((theme) => ({
  ipa: {
    whiteSpace: 'nowrap'
  },
  pronunciation: {
    fontStyle: 'italic',
    color: theme.palette.action.disabled,
    whiteSpace: 'nowrap'
  },
  partOfSpeech: {
    fontSize: 12,
    color: theme.palette.action.disabled,
    display: 'block'
  },
  unknown: {
    color: theme.palette.action.disabled
  }
}));

function MeaningRow(meaning: Meaning, classes): JSX.Element {
  return (
    <span className={classes.meaning}>
      <span className={classes.partOfSpeech}>{PartOfSpeech[meaning.partOfSpeech]}</span>
      <span>{meaning.definition}</span>
    </span>
  );
}

export default function WordsTable({ words }: { words: Array<TableWord> }) {
  const classes = useStyles();

  const { config } = useContext(ConfigContext);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Word</TableCell>
          {config.showPronunciations && <TableCell>Pronunciation</TableCell>}
          {config.showDefinitions && <TableCell>Meaning</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {words.map((word: TableWord) => (
          <TableRow key={word.word}>
            <TableCell>{word.word}</TableCell>
            {
              config.showPronunciations &&
              <TableCell>
                <span className={classes.ipa}>{word.ipa}</span>{'\u2003'}<span
                className={classes.pronunciation}>{word.phonemes}</span>
              </TableCell>
            }
            {
              config.showDefinitions &&
              <TableCell>{word.meanings ?
                MeaningRow(word.meanings[0], classes)
                : <span className={classes.unknown}>unknown</span>}</TableCell>
            }
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
