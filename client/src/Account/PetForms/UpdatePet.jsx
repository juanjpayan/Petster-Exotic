import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

const UpdatePet = ({ setPetUpdateID, petUpdateID, setSelectID, selectID }) => {
  const [petList, setPetList] = useState([]);

  useEffect(() => {
    axios
      .get('/api/user/me', { withCredentials: true })
      .then((res) => {
        let pets = res.data.ownedPets;
        setPetList([...petList, ...pets]);
      })
      .catch((error) => console.log(error));
  }, [setPetList]);

  return (
    <div className="pet-select-id">
      <Typography variant="h5">Select a Pet to Update: </Typography>
      <FormControl className="tab-input" variant="outlined">
        <InputLabel id="type">Pet ID</InputLabel>
        <Select
          style={{ textAlign: 'left' }}
          value={selectID}
          name="_id"
          onChange={(e) => {
            setPetUpdateID({ ...petUpdateID, id: e.target.value });
            setSelectID(e.target.value);
          }}
          label="pet"
        >
          <MenuItem disabled>Select Pet</MenuItem>
          {petList &&
            petList
              .map((pet) => (
                <MenuItem key={pet._id} value={pet._id}>
                  {pet.name}
                </MenuItem>
              ))
              .reverse()}
        </Select>
      </FormControl>
    </div>
  );
};

export default UpdatePet;
