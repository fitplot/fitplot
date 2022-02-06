import React, { useEffect } from "react";
import _ from "lodash";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import SetsView from "./SetsView";
import { Input } from "../forms";
import Button from "../button";
import { useUpdateSet } from "../../hooks/use-sets";

export default function Exercise({
  exercise: { name } = {},
  sets = [],
  isOpen,
  close
}) {
  const [editedSets, setEditedSets] = React.useState();

  useEffect(() => {
    if (isOpen && !editedSets) {
      setEditedSets(_.clone(sets));
    }
  }, [isOpen, editedSets, sets]);

  const mutation = useUpdateSet();

  const submit = async () => {
    editedSets.forEach(async editedSet => {
      const ogSet = sets.find(s => s.id === editedSet.id);
      if (!_.isEqual(ogSet, editedSet)) {
        await mutation.mutateAsync(editedSet);
      }
    });
    close();
  };

  const onEditSet = (setId, changes) => {
    const index = sets.findIndex(set => set.id === setId);
    if (index > -1) {
      const hotSet = editedSets[index];
      const changed = [
        ...editedSets.slice(0, index),
        { ...hotSet, ...changes },
        ...editedSets.slice(index + 1)
      ];
      setEditedSets(changed);
    }
  };

  return (
    <DialogOverlay isOpen={isOpen} onDismiss={close} aria-label="View Exercise">
      <DialogContent
        className="!w-screen md:!w-half-screen"
        aria-label="View Exercise"
      >
        <div className="flex flex-col space-y-2">
          <Input
            className="bg-white px-4 py-2"
            type="textarea"
            defaultValue={name}
          />
          <SetsView sets={editedSets} isEditable={true} onEdit={onEditSet} />
          <div className="flex space-x-4">
            <Button className="flex-1" onClick={() => close()}>
              <XIcon className="w-6 h-6 inline-block" />
            </Button>
            <Button className="flex-1" onClick={() => submit()}>
              <CheckIcon className="w-6 h-6 inline-block" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </DialogOverlay>
  );
}
