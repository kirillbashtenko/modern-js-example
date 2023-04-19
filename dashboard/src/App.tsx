import { BrowserRouter, Route, Routes } from '@modern-js/runtime/router';

export default () => {
  return (
    <BrowserRouter basename={'/dashboard'}>
      <Routes>
        <Route index element={<div>Self-controlled route rootasdas</div>} />
        <Route path={'path'} element={<div>Self-controlled sub route</div>} />
      </Routes>
    </BrowserRouter>
  );
};
