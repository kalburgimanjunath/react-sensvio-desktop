import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreateContent from '../../components/CreateContent.js';
import { useSelector, useDispatch } from 'react-redux';
import ContentList from '../../components/ContentList';
export default function Home() {
  const content = useSelector((state) => state.content);
  return (
    <div>
      <CreateContent />
      <ContentList data={content} />
    </div>
  );
}
