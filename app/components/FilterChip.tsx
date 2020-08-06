import { Chip, Icon } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Filter, filterKeys, FilterType } from '../constants/types';

const iconMeaningLike = <Icon>psychology</Icon>;
const iconSoundsLike = <Icon>hearing</Icon>;
const iconSpelling = <Icon>edit</Icon>;
const iconRightArrow = <Icon>arrow_forward</Icon>;
const iconLeftArrow = <Icon>arrow_backward</Icon>;
const iconCopy = <Icon>content_copy</Icon>;
const iconText = <Icon>article</Icon>;
const oppositeIcon = <Icon>swap_horiz</Icon>;
const categoryIcon = <Icon>category</Icon>;
const partIcon = <Icon>groupWork</Icon>;
const unknownIcon = <Icon>help</Icon>;

const filterChipTypes = new Map([
  [FilterType.MEANS_LIKE, { icon: iconMeaningLike, text: 'meaning like' }],
  [FilterType.SOUNDS_LIKE, { icon: iconSoundsLike, text: 'sounds like' }],
  [FilterType.SPELLED_LIKE, { icon: iconSpelling, text: 'spelled like' }],
  [FilterType.MODIFIED_BY, { icon: iconRightArrow, text: 'modified by' }],
  [FilterType.MODIFIES, { icon: iconLeftArrow, text: 'modifies' }],
  [FilterType.SYNONYMS, { icon: iconCopy, text: 'synonym of' }],
  [FilterType.TRIGGERS, { icon: iconText, text: 'occurs with' }],
  [FilterType.ANTONYMS, { icon: oppositeIcon, text: 'antonym of' }],
  [FilterType.HYPERNYMS, { icon: categoryIcon, text: 'parent of' }],
  [FilterType.HYPONYMS, { icon: categoryIcon, text: 'type of' }],
  [FilterType.HOLONYMS, { icon: partIcon, text: 'part of' }],
  [FilterType.MERONYMS, { icon: partIcon, text: 'comprises' }],
  [FilterType.FOLLOWS, { icon: iconRightArrow, text: 'follows' }],
  [FilterType.PRECEDES, { icon: iconLeftArrow, text: 'precedes' }],
  [FilterType.RHYMES, { icon: iconSoundsLike, text: 'rhymes with' }],
  [
    FilterType.NEAR_RHYMES,
    { icon: iconSoundsLike, text: 'nearly rhymes with' },
  ],
  [FilterType.HOMOPHONES, { icon: iconSoundsLike, text: 'homophone of' }],
  [
    FilterType.CONSONANT_MATCHES,
    { icon: iconSpelling, text: 'shares consonants with' },
  ],
]);

const useStyles = makeStyles((theme) => ({
  chip: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
    height: 'auto',
    fontSize: 17,
    fontFamily: 'monospace',
    color: theme.palette.primary.light,
  },
  filterName: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
  filterQuery: {
    color: theme.palette.primary.contrastText,
  },
  filterInput: {
    outline: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: theme.palette.common.black,
    fontFamily: 'monospace',
    marginRight: theme.spacing(1),
  },
  filterQueryInput: {
    color: theme.palette.primary.contrastText,
  },
  hidden: {
    display: 'none',
  },
  error: {
    color: 'red',
  },
}));

export function InputChip(props: {
  onAddFilter: (filter: Filter) => void;
  onDeletePrevious: () => void;
}): JSX.Element {
  const classes = useStyles();
  const typeInput = useRef<HTMLElement>(null);
  const queryInput = useRef<HTMLElement>(null);

  const [newType, setNewType] = useState<FilterType | undefined>(undefined);

  const clear = () => {
    setNewType(undefined);
    queryInput.current.innerText = '';
    typeInput.current.innerText = '';
    typeInput.current.focus();
    queryInput.current.classList.add(classes.hidden);
  };

  const onTypeInput = (event: React.FormEvent<HTMLElement>) => {
    if (event.currentTarget.innerHTML.includes('&nbsp;')) {
      const maybeNewType = filterKeys.get(
        event.currentTarget.innerText.trimEnd()
      );
      if (maybeNewType !== undefined) {
        setNewType(maybeNewType);
        event.currentTarget.innerText = filterChipTypes.get(maybeNewType)
          ?.text as string;
        queryInput.current.classList.remove(classes.hidden);
        queryInput.current.focus();
      } else {
        event.currentTarget.classList.add(classes.error);
      }
    } else {
      event.currentTarget.classList.remove(classes.error);
    }
  };

  const onTypeInputKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.keyCode) {
      case 8:
        if (window.getSelection()?.getRangeAt(0).startOffset === 0)
          props.onDeletePrevious();
        break;
      case 13:
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const onQueryInputKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    switch (event.keyCode) {
      case 8:
        if (window.getSelection()?.getRangeAt(0).startOffset === 0) clear();
        break;
      case 13:
        event.preventDefault();
        break;
      default:
        break;
    }
  };

  const onQueryInput = (event: React.FormEvent<HTMLElement>) => {
    if (event.currentTarget.innerHTML.includes('&nbsp;')) {
      props.onAddFilter({
        type: newType,
        query: event.currentTarget.innerText.trimEnd(),
      });
      clear();
    }
  };

  return (
    <Chip
      className={classes.chip}
      icon={
        newType !== undefined ? filterChipTypes.get(newType).icon : unknownIcon
      }
      label={
        <span>
          <span
            contentEditable
            className={classes.filterInput}
            onKeyDown={onTypeInputKeyDown}
            onInput={onTypeInput}
            ref={typeInput}
          />
          <span
            contentEditable
            className={classes.filterInput}
            onKeyDown={onQueryInputKeyDown}
            onInput={onQueryInput}
            ref={queryInput}
          />
        </span>
      }
    />
  );
}

export default function FilterChip({
  filter,
  onDelete,
}: {
  filter: Filter;
  onDelete: () => void;
}) {
  const classes = useStyles();

  const chipType = filterChipTypes.get(filter.type);
  if (chipType == null) return null;

  return (
    <Chip
      className={classes.chip}
      onDelete={onDelete}
      icon={chipType.icon}
      label={
        <span>
          <span className={classes.filterName}>{chipType.text}</span>
          <span className={classes.filterQuery}>{filter.query}</span>
        </span>
      }
      color="primary"
    />
  );
}
