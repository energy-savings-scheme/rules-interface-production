import React, { Fragment, useState, useEffect } from 'react';

import VariableSearchBar from 'pages/homepage/VariableSearchBar';

import Card, { CardCopy } from 'nsw-ds-react/card/card';
import { ContentBlock } from 'nsw-ds-react/content-block/contenBlock';
import { ProgressIndicator } from 'nsw-ds-react/forms/progress-indicator/progressIndicator';
import DropDownMenu from 'components/form_elements/DropDownMenu';
import Button from 'nsw-ds-react/button/button';
import { FormGroupSelect } from 'nsw-ds-react/forms';
import { FormGroup, TextInput, Select } from 'nsw-ds-react/forms';
import RegistryApi from 'services/registry_api';
import OpenFiscaAPI from 'services/openfisca_api';
import SpinnerFullscreen from 'components/layout/SpinnerFullscreen';
import OpenFiscaApi from 'services/openfisca_api';
import Notification from 'nsw-ds-react/notification/notification';
import CertificateEstimatorLoadClausesMotors from './CertificateEstimatorLoadClausesMotors';
import HeroBanner from 'nsw-ds-react/heroBanner/heroBanner';

export default function CertificateEstimatorMotors(props) {
  const { entities, variables, setVariables, setEntities, loading, setLoading } = props;

  const [formValues, setFormValues] = useState([]);
  const [stepNumber, setStepNumber] = useState(1);
  const [metadata, setMetadata] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [calculationResult2, setCalculationResult2] = useState(null);
  const [calculationError, setCalculationError] = useState(false);
  const [calculationError2, setCalculationError2] = useState(false);
  const [postcode, setPostcode] = useState(null);
  const [registryData, setRegistryData] = useState(true);
  const [variableData1, setVariableData1] = useState([]);
  const [variableData2, setVariableData2] = useState([]);
  const [persistFormValues, setPersistFormValues] = useState([]);
  const [flow, setFlow] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (variables.length < 1) {
      OpenFiscaAPI.listEntities()
        .then((res) => {
          setEntities(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (entities.length < 1) {
      OpenFiscaAPI.listVariables()
        .then((res) => {
          setVariables(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    OpenFiscaAPI.getVariable('SYS1_PRC_calculation')
      .then((res) => {
        setVariableData1(res.data);
        console.log(res.data);
        console.log('here!!');
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    OpenFiscaAPI.getVariable('SYS1_ESC_calculation')
      .then((res) => {
        setVariableData2(res.data);
        console.log(res.data);

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [variables, entities]);

  return (
    <Fragment>
      <br></br>
      <HeroBanner
        wide
        style="dark"
        image={{
          alt: 'commercial motors',
          src: 'CommercialVentilationRefrigeration.jpeg',
        }}
        intro="Energy Savings Scheme and Peak Demand Reduction Scheme"
        title="Safeguard Certificate Estimator"
      />

      <div className="nsw-container">
        <br></br>
        <br></br>
        {stepNumber !== 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">Commercial Motors certificate estimator</h2>
              <br></br>
              <p className="nsw-content-block__copy">
                Estimate the energy savings certificates (ESCs) and peak reduction certificates
                (PRCs) for the Commercial Motors (Refrigeration or Ventilation) Activity (F7 in the
                Energy Savings Scheme and SYS1 in the Peak Demand Reduction Scheme) by answering the
                following questions.
              </p>
              <p className="nsw-content-block__copy">
                Please keep in mind that the results are indicative only and cannot be promoted or
                published.
              </p>
            </div>
          </div>
        )}

        {stepNumber === 2 && (
          <div className="nsw-grid nsw-grid--spaced">
            <div className="nsw-col nsw-col-md-10">
              <h2 className="nsw-content-block__title">Commercial Motors certificate estimator</h2>
            </div>
          </div>
        )}

        <ProgressIndicator step={stepNumber} of={2} style={{ width: '80%' }} />

        <Fragment>
          {stepNumber === 1 && loading && <SpinnerFullscreen />}

          {stepNumber === 1 && (
            <CertificateEstimatorLoadClausesMotors
              variableData1={variableData1}
              variableData2={variableData2}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              calculationResult2={calculationResult2}
              setCalculationResult={setCalculationResult}
              setCalculationResult2={setCalculationResult2}
              calculationError={calculationError}
              calculationError2={calculationError2}
              setCalculationError={setCalculationError}
              setCalculationError2={setCalculationError2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              formValues={formValues}
              setFormValues={setFormValues}
              flow={flow}
              setFlow={setFlow}
              backAction={(e) => {
                setStepNumber(stepNumber - 1);
              }}
            />
          )}

          {stepNumber === 2 && (
            <CertificateEstimatorLoadClausesMotors
              variableData1={variableData1}
              variableData2={variableData2}
              variables={variables}
              entities={entities}
              metadata={metadata}
              calculationResult={calculationResult}
              setCalculationResult={setCalculationResult}
              calculationError={calculationError}
              setCalculationError={setCalculationError}
              calculationResult2={calculationResult2}
              setCalculationResult2={setCalculationResult2}
              stepNumber={stepNumber}
              setStepNumber={setStepNumber}
              formValues={formValues}
              setFormValues={setFormValues}
              persistFormValues={persistFormValues}
              setPersistFormValues={setPersistFormValues}
              flow={flow}
              setFlow={setFlow}
            />
          )}

          {stepNumber === 2 && calculationError && calculationError2 && <SpinnerFullscreen />}

          {stepNumber === 1 && registryData && postcode && postcode.length === 4 && (
            <div className="nsw-row" style={{ paddingTop: '30px' }}>
              <div className="nsw-col" style={{ padding: 'inherit', width: '80%' }}>
                <Button
                  as="dark"
                  onClick={(e) => {
                    setFlow('forward');
                    setStepNumber(stepNumber + 1);
                  }}
                  style={{ float: 'right' }}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </Fragment>
      </div>
    </Fragment>
  );
}
