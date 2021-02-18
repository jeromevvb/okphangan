import React, { useEffect, useState } from "react";
import firebase from "@services/firebase";

//.onSnapshot( snapshot => { const ingredients = [] snapshot.forEach(doc => { ingredients.push(doc) }) setLoading(false) setIngredients(ingredients) }, err => { setError(err) } )

function useCollection<DataModel>(
  id: string
): { error: boolean; loading: boolean; data: DataModel[] | undefined } {
  // initialize our default state
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataModel[] | []>([]);

  // when the id attribute changes (including mount)
  // subscribe to the recipe document and update
  // our state when it changes.
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection(id)
      .onSnapshot(
        (snapshot) => {
          setLoading(false);
          const results = [] as DataModel[];
          snapshot.forEach((doc) => {
            const documentData = { ...(doc.data() as DataModel), id: doc.id };
            results.push(documentData);
          });

          setData(results);
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

export default useCollection;
