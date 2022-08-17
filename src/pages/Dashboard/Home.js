import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreateContent from '../../components/CreateContent.js';
export default function Home() {
  return (
    <div>
      <CreateContent />
    </div>
  );
}
