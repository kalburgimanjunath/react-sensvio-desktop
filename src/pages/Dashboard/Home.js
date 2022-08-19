import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CreateContent from '../../components/CreateContent.js';
import { useSelector, useDispatch } from 'react-redux';
import ContentList from '../../components/ContentList';
import { FormGroup, Label, Col, Row, Input } from 'reactstrap';
export default function Home() {
  const content = useSelector((state) => state.content);
  return (
    <div className="container-fluid css-selector">
      <Row>
        <Col xs="6">
          <CreateContent />
        </Col>
        <Col xs="6">
          <ContentList data={content} />
        </Col>
      </Row>
    </div>
  );
}
