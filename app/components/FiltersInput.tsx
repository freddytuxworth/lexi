import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FilterChip, { InputChip } from './FilterChip';
import { Filter } from '../constants/types';

const useStyles = makeStyles((theme) => ({
  queries: {
    padding: theme.spacing(1),
    margin: theme.spacing(2),
    marginTop: 0,
  },
  input: {
    width: 0,
    height: 0,
    opacity: 0,
  },
  inputChip: {
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
    height: 'auto',
    fontSize: 17,
    fontFamily: 'monospace',
    color: theme.palette.action.active,
  },
  filterName: {
    color: theme.palette.primary.light,
    marginRight: theme.spacing(1),
  },
}));

export default function FiltersInput(props: {
  onFiltersChanged: (filters: Array<Filter>) => void;
}): JSX.Element {
  const classes = useStyles();
  const [filters, setFilters] = useState<Array<Filter>>([]);
  // const [selectedIndex, setSelectedIndex] = useState(undefined);

  // const selectFilter = (index: number) => {
  //   setSelectedIndex(index);
  // }
  //
  // const onInputLeaveFocus = () => {
  //   if(filters)
  //     selectFilter(filters.length - 1);
  // }

  const deleteFilter = (index: number) => {
    const newFilters = filters.filter((_, i) => i !== index);
    setFilters(newFilters);
    props.onFiltersChanged(newFilters);
  };

  const addFilter = (filter: Filter): void => {
    const newFilters = [
      ...filters.filter((f) => f.type !== filter.type),
      filter,
    ];
    setFilters(newFilters);
    props.onFiltersChanged(newFilters);
  };

  useEffect(() => {});

  return (
    <Paper variant="outlined" className={classes.queries}>
      {filters.map((filter, index) => (
        <FilterChip
          key={filter.type}
          filter={filter}
          onDelete={() => deleteFilter(index)}
        />
      ))}
      <InputChip
        onAddFilter={addFilter}
        onDeletePrevious={() => deleteFilter(filters.length - 1)}
      />
    </Paper>
  );
}
