import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Indonesia from '../Pages/Indonesia';
import Covid19 from '../Pages/Covid19';
import Programming from '../Pages/Programming';
import Saved from '../Pages/Saved';
import SearchPage from '../Pages/SearchPage';
import ErrorPage from '../Pages/ErrorPage';

const Index = (props) => (
  <Routes>
    <Route path="/" element={<Indonesia getNewsData={props.getNewsData}/>} />
    <Route path="/indonesia" element={<Indonesia getNewsData={props.getNewsData} />} />
    <Route path="/covid" element={<Covid19 getNewsData={props.getNewsData}/>} />
    <Route path="/programming" element={<Programming getNewsData={props.getNewsData}/>} />
    <Route path="/search/:query" element={<SearchPage getNewsData={props.getNewsData} searchValue={props.searchValue}/>} />
    <Route path="/saved" element={<Saved />} />
    <Route path='/error' element={<ErrorPage />} />
    <Route path="*" element={<Navigate to ='/indonesia' getNewsData={props.getNewsData}/>} />
  </Routes>
)

export default Index;