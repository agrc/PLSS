import * as React from 'react';
import { useHistory } from 'react-router-dom';

const getDefault = (value, nullReplacement = '-') => {
  value = value?.toString().toLowerCase().trim();

  if (!value) {
    return nullReplacement;
  }

  const nulls = ['null', '<null>', ''];

  if (nulls.includes(value)) {
    return nullReplacement;
  }

  return value;
};

export default function Identify({ graphic }) {
  const history = useHistory();

  return (
    <>
      <h1 className="text-2xl font-bold">Monument Record</h1>
      <main className="inline-grid gap-1 mt-3 text-sm">
        <section className="flex w-full">
          <span className="mr-2">{graphic.attributes['X or East Coordinate']}</span>
          <span>{graphic.attributes['Y or North Coordinate']}</span>
        </section>

        <section className="flex w-full">
          <span className="mr-2 font-bold">Elevation</span>
          <span>{getDefault(graphic.attributes['Average Township Elevation'])} ft</span>
        </section>

        <section className="mt-4">
          <a href="/404" className="font-semibold text-indigo-300 hover:text-indigo-400">
            Tie Sheet Document(s)
          </a>
        </section>

        <hr className="my-2 border-indigo-400 sm:my-6" />

        <section className="flex flex-col w-full sm:gap-3">
          <div className="flex justify-between w-2/3 sm:w-full">
            <label className="font-semibold">Corner Id</label>
            <span>{graphic.attributes['Corner Point Identifier']}</span>
          </div>
          <div className="flex justify-between w-2/3 sm:w-full">
            <label className="font-semibold">PLSS Id</label>
            <span>{graphic.attributes['PLSS Area Identification']}</span>
          </div>
          <div className="flex justify-between w-2/3 sm:w-full">
            <label className="font-semibold">Point Label</label>
            <span>{graphic.attributes['Corner Point Label']}</span>
          </div>
          <div className="flex justify-between w-2/3 sm:w-full">
            <label className="font-semibold">Error North</label>
            <span>{getDefault(graphic.attributes['Error in Y'])}</span>
          </div>
          <div className="flex justify-between w-2/3 sm:w-full">
            <label className="font-semibold">Error East</label>
            <span>{getDefault(graphic.attributes['Error in X'])}</span>
          </div>
        </section>

        <button
          className=""
          onClick={() => {
            console.log(history.goBack());
          }}
        >
          close
        </button>
      </main>
    </>
  );
}