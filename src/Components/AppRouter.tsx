import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DienstpA from '../Pages/DientspA';
import DienstpBw from '../Pages/DientspBw';
import EinzelA from '../Pages/EinzelA';
import DienstpHw from '../Pages/DientspHw';
import EinzelHw from '../Pages/EinzelHw';
import EinzelBw from '../Pages/EinzelBw';

const Pages = [
    { path: 'DienstpA', component: <DienstpA /> },
    { path: 'DienstpBw', component: <DienstpBw /> },
    { path: 'EinzelA', component: <EinzelA /> },
    { path: 'DienstpHw', component: <DienstpHw /> },
    { path: 'EinzelHw', component: <EinzelHw /> },
    { path: 'EinzelBw', component: <EinzelBw /> },
  ];
  
  const AppRouter: React.FC = () => (
    <Routes>
      <Route path="/DienstpBw" element={<DienstpBw />} />
      {Pages.map((Page, index) => (
        <Route key={index} path={`/${Page.path}`} element={Page.component} />
      ))}
    </Routes>
  );

export default AppRouter;