import React, { useEffect, useState } from "react";
import firebase from "@services/firebase";

function useDocument<DataModel>(
  id: string
): { error: boolean; loading: boolean; data: DataModel | undefined } {
  // initialize our default state
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataModel | undefined>(undefined);

  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .doc(id)
      .onSnapshot(
        (doc) => {
          if (doc.exists) {
            const documentData = { ...(doc.data() as DataModel), id: doc.id };
            setData(documentData);
          }

          setLoading(false);
        },
        (err) => {
          console.log(err);
          setError(true);
        }
      );

    // returning the unsubscribe function will ensure that
    // we unsubscribe from document changes when our id
    // changes to a different value.
    return () => unsubscribe();
  }, [id]);

  return {
    error,
    loading,
    data,
  };
}

export default useDocument;
