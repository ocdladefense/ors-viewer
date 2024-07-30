/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import ItemPage from './ItemPage';
/* eslint-enable */

export default function Sidebar_Left({ type }) {
    return (
        <aside class='hidden h-[87.5vh] overflow-scroll border-x lg:block'>
            <ul>
                {type === 'books-online' ? (
                    <>
                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/foreword'
                            heading='Chapter 1'
                            body=''
                        />
                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/sentencing-outline'
                            heading='Sentencing Outline'
                            body=''
                        />
                        <ItemPage
                            active={true}
                            href='https://pubs.ocdla.org/fsm/1'
                            heading='Chapter 1'
                            body='Introduction'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/2'
                            heading='Chapter 2'
                            body='Crime Seriousness Rankings'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/3'
                            heading='Chapter 3'
                            body='Criminal History Scoring'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/4'
                            heading='Chapter 4'
                            body='Prison Sentences and Post-Prison Supervision'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/5'
                            heading='Chapter 5'
                            body='Probationary and Straight Jail Sentences'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/6'
                            heading='Chapter 6'
                            body='Plea Agreements'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/7'
                            heading='Chapter 7'
                            body='Departure Sentences'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/8'
                            heading='Chapter 8'
                            body='Merger and Consecutive Sentences'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/9'
                            heading='Chapter 9'
                            body='Appeals and Post-Sentencing/Resentencing Authority'
                        />

                        <ItemPage
                            href='https://pubs.ocdla.org/fsm/10'
                            heading='Chapter 10'
                            body='Sentencing Guidelines'
                        />
                    </>
                ) : type === 'ors-viewer' ? (
                    <>
                        <ItemPage
                            active={true}
                            href='https://oregon.public.law/statutes/ors_1.001'
                            heading='1.001'
                            body='State policy for courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.002'
                            heading='1.002'
                            body='Supreme Court'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.003'
                            heading='1.003'
                            body='Chief Justice’s powers to appoint Chief Judge and presiding judges'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.004'
                            heading='1.004'
                            body='Supreme Court rules governing coordination of class actions'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.005'
                            heading='1.005'
                            body='Credit card transactions for fees, security deposits, fines and other court-imposed obligations'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.006'
                            heading='1.006'
                            body='Supreme Court rules'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.007'
                            heading='1.007'
                            body='Judicial Department Revolving Account'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.008'
                            heading='1.008'
                            body='Personnel plan, fiscal plan and property plan'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.009'
                            heading='1.009'
                            body='Judicial Department Operating Account'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.010'
                            heading='1.010'
                            body='Powers of courts in administration of court business and proceedings'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.012'
                            heading='1.012'
                            body='State Court Technology Fund'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.020'
                            heading='1.020'
                            body='Contempt punishment'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.025'
                            heading='1.025'
                            body='Duty of court and court officers to require performance of duties relating to administration of justice'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.030'
                            heading='1.030'
                            body='Seal'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.040'
                            heading='1.040'
                            body='Sittings of court to be public'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.050'
                            heading='1.050'
                            body='Time for decision on submitted questions'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.060'
                            heading='1.060'
                            body='Days for transaction of judicial business'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.070'
                            heading='1.070'
                            body='When court deemed appointed for next judicial day'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.080'
                            heading='1.080'
                            body='Place of holding court'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.085'
                            heading='1.085'
                            body='Chief Justice to designate principal location for sitting of courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.090'
                            heading='1.090'
                            body='Trial elsewhere than at usual location on agreement of parties'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.110'
                            heading='1.110'
                            body='Adjournment when judge does not attend'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.120'
                            heading='1.120'
                            body='Proceedings unaffected by vacancy in office'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.130'
                            heading='1.130'
                            body='Power to adjourn proceedings'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.140'
                            heading='1.140'
                            body='Manner of addressing application or proceeding to court or judge'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.150'
                            heading='1.150'
                            body='Proceedings to be in English'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.160'
                            heading='1.160'
                            body='Means to carry jurisdiction into effect'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.171'
                            heading='1.171'
                            body='Powers and duties of presiding judge for judicial district'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.175'
                            heading='1.175'
                            body='Docket priorities'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.176'
                            heading='1.176'
                            body='Capital improvements to county courthouses'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.177'
                            heading='1.177'
                            body='State plan for security, emergency preparedness and business continuity for court facilities'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.178'
                            heading='1.178'
                            body='State Court Facilities and Security Account'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.180'
                            heading='1.180'
                            body='Advisory committees on court security and emergency preparedness'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.182'
                            heading='1.182'
                            body='Court facilities security accounts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.185'
                            heading='1.185'
                            body='County to provide courtrooms, offices and jury rooms'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.187'
                            heading='1.187'
                            body='State to provide supplies and personal property for courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.188'
                            heading='1.188'
                            body='Surcharge on fines for courthouse'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.189'
                            heading='1.189'
                            body='Courthouse surcharge accounts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.194'
                            heading='1.194'
                            body='Definitions for ORS 1.194 to 1.200'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.195'
                            heading='1.195'
                            body='Reports on liquidated and delinquent accounts of state courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.196'
                            heading='1.196'
                            body='Agreement for reciprocal offsets'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.197'
                            heading='1.197'
                            body='Assignment of liquidated and delinquent accounts to collection agencies'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.198'
                            heading='1.198'
                            body='Exemptions from requirements of ORS 1.197'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.199'
                            heading='1.199'
                            body='Policies and procedures for exempting accounts from requirements of ORS 1.197 and for ceasing collection efforts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.200'
                            heading='1.200'
                            body='Effect of ORS 1.194 to 1.200 on authority of judge'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.202'
                            heading='1.202'
                            body='Fee for establishing and administering account for judgment that includes monetary obligation'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.210'
                            heading='1.210'
                            body='Judicial officer defined'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.212'
                            heading='1.212'
                            body='Oath of office for judges'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.220'
                            heading='1.220'
                            body='Judicial officer or partner acting as attorney'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.230'
                            heading='1.230'
                            body='Powers of a judge out of court'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.240'
                            heading='1.240'
                            body='Powers of judicial officers'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.250'
                            heading='1.250'
                            body='Punishment for contempt'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.260'
                            heading='1.260'
                            body='Powers of judges of Supreme Court, Court of Appeals, Oregon Tax Court and circuit courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.270'
                            heading='1.270'
                            body='Powers of other judicial officers'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.290'
                            heading='1.290'
                            body='Leaves of absence'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.300'
                            heading='1.300'
                            body='Senior judge'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.303'
                            heading='1.303'
                            body='Disability of judge'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.305'
                            heading='1.305'
                            body='Commencement of judicial term of office'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.310'
                            heading='1.310'
                            body='Involuntary retirement of judges for disability'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.410'
                            heading='1.410'
                            body='Commission on Judicial Fitness and Disability'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.415'
                            heading='1.415'
                            body='Powers and duties of commission'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.420'
                            heading='1.420'
                            body='Investigation'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.425'
                            heading='1.425'
                            body='Commission proceedings upon receipt of complaint of disability'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.430'
                            heading='1.430'
                            body='Supreme Court review'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.440'
                            heading='1.440'
                            body='Status of records of proceedings under ORS 1.420 or 1.425'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.450'
                            heading='1.450'
                            body='Status of testimony in proceedings under ORS 1.420 or 1.425'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.460'
                            heading='1.460'
                            body='Judge not to participate in proceedings involving self except in defense'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.470'
                            heading='1.470'
                            body='Service of process'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.475'
                            heading='1.475'
                            body='Procedure when process not obeyed'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.480'
                            heading='1.480'
                            body='Officers'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.525'
                            heading='1.525'
                            body='Uniform citation and petition forms for certain offenses'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.550'
                            heading='1.550'
                            body='Private counsel for judges'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.560'
                            heading='1.560'
                            body='Procedure for employment of private counsel'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.570'
                            heading='1.570'
                            body='Claims for compensation of private counsel'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.600'
                            heading='1.600'
                            body='Appointment pro tempore to Supreme Court or Court of Appeals'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.605'
                            heading='1.605'
                            body='Compensation and expenses for judges under ORS 1.600'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.615'
                            heading='1.615'
                            body='Appointment pro tempore to tax court or circuit court'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.625'
                            heading='1.625'
                            body='Compensation and expenses for judges under ORS 1.615'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.635'
                            heading='1.635'
                            body='Appointment pro tempore of eligible person to tax court or circuit court'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.645'
                            heading='1.645'
                            body='Transfer, challenge, disqualification, supervision of person appointed under ORS 1.635'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.655'
                            heading='1.655'
                            body='Extension and termination of appointment under ORS 1.635'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.665'
                            heading='1.665'
                            body='Compensation and expenses of persons appointed under ORS 1.635'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.675'
                            heading='1.675'
                            body='Judge pro tempore ineligible to participate in selection or removal of Chief Justice, Chief Judge or presiding judge'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.725'
                            heading='1.725'
                            body='Legislative findings'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.730'
                            heading='1.730'
                            body='Council on Court Procedures'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.735'
                            heading='1.735'
                            body='Rules of procedure'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.740'
                            heading='1.740'
                            body='Employment of staff'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.745'
                            heading='1.745'
                            body='Laws on civil pleading, practice and procedure deemed rules of court until changed'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.750'
                            heading='1.750'
                            body='Legislative Counsel to publish rules'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.755'
                            heading='1.755'
                            body='Gifts, grants and donations'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.760'
                            heading='1.760'
                            body='Legislative advisory committee'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.810'
                            heading='1.810'
                            body='Judicial conference'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.820'
                            heading='1.820'
                            body='Function of conference'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.830'
                            heading='1.830'
                            body='Meetings'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.840'
                            heading='1.840'
                            body='Annual report'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.851'
                            heading='1.851'
                            body='Local criminal justice advisory councils'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.855'
                            heading='1.855'
                            body='State Court Administrator to establish registry of justice and municipal courts'
                        />
                        <ItemPage
                            href='https://oregon.public.law/statutes/ors_1.860'
                            heading='1.860'
                            body='Reports relating to municipal courts and justice courts'
                        />
                    </>
                ) : (
                    <></>
                )}
            </ul>
        </aside>
    );
}
