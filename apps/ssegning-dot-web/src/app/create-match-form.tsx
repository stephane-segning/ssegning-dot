import { withFormik } from 'formik';
import * as yup from 'yup';
import type { FormikProps } from 'formik/dist/types';
import React from 'react';
import * as _ from 'lodash';
import { SelectInput } from './components/select-input';
import { Button } from './components/button';
import { GameComponent } from 'boardgame.io/dist/types/src/lobby/connection';
import { AppForm, FieldInput } from './components/form-control';

const schema = yup.object({
  selectedGameId: yup.string().required(),
  numPlayers: yup.number().required(),
});

export interface CreateMatchValue {
  selectedGameId: string;
  numPlayers: number;
}

interface CreateMatchProps {
  games: GameComponent[];
  defaultNumPlayers?: number;
  createMatch: (value: CreateMatchValue) => void;
}

function CreateMatchForm(
  props: CreateMatchProps & FormikProps<CreateMatchValue>
) {
  const { values, games } = props;

  return (
    <AppForm>
      <SelectInput label="Select the game" name="selectedGameId">
        {games.map(({ game: { name } }) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </SelectInput>

      <SelectInput label="Pick a number of player" name="numPlayers">
        {_.filter(games, ({ game: { name } }) => name === values.selectedGameId)
          .map(({ game: { minPlayers, maxPlayers } }) => {
            maxPlayers = maxPlayers ?? 10;
            if (!minPlayers) return _.range(maxPlayers);
            return _.range(minPlayers, maxPlayers);
          })
          .flat()
          .map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </SelectInput>

      <Button type="submit">Submit</Button>
    </AppForm>
  );
}

export const CreateMatchBlock = withFormik<CreateMatchProps, CreateMatchValue>({
  mapPropsToValues: ({ games, defaultNumPlayers }) => ({
    selectedGameId: (games.length > 0 ? games[0].game.name : undefined) ?? '',
    numPlayers: defaultNumPlayers ?? 2,
  }),
  // Custom sync validation
  validationSchema: schema,
  //
  handleSubmit: (values, { props: { createMatch } }) => {
    createMatch(values);
  },
  //
  displayName: 'CreateMatchBlock',
})(CreateMatchForm);
