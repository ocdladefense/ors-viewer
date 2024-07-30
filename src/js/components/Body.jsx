/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Body({ type }) {
    const styleTabActive =
        'tab-btn rounded-t-md border border-b-transparent p-4';
    const styleTabInactive =
        'tab-btn rounded-t-md border border-transparent border-b-inherit p-4 text-blue-400 hover:text-blue-500 hover:underline hover:underline-offset-2';
    const toggleTabs = tabBtnClicked => {
        const tabBtns = document.getElementsByClassName('tab-btn');
        const tabBodies = document.getElementsByClassName('tab-body');

        Array.from(tabBtns).forEach(
            tabBtn =>
                (tabBtn.className =
                    tabBtnClicked.target === tabBtn
                        ? styleTabActive
                        : styleTabInactive)
        );

        Array.from(tabBodies).forEach(tabBody =>
            tabBtnClicked.target.id.split('-')[2] === tabBody.id.split('-')[2]
                ? tabBody.classList.remove('hidden')
                : tabBody.classList.add('hidden')
        );
    };

    return (
        <main class='flex flex-col gap-4 p-4 lg:col-span-4 lg:col-start-2 lg:me-auto lg:p-8'>
            {type === 'books-online' ? (
                <div class='flex flex-col gap-4'>
                    <h1 class='text-3xl font-bold'>
                        Felony Sentencing in Oregon: Guidelines, Statutes, Cases{' '}
                        <button class='contrast-[200] saturate-0 hover:opacity-[67.5%]'>
                            🔖
                        </button>
                    </h1>
                    <p class='font-thin'>
                        2019 edition — Includes June 2023 updates by Jennelle
                        Meeks Barton
                    </p>
                    <h1 class='text-3xl font-bold'>Chapter 1 - Introduction</h1>
                    <p class='flex items-center gap-2'>
                        <Hyperlink
                            type='standard'
                            href='/'
                            body='Jesse Wm. Barton 🖉'
                        />
                    </p>
                    <div class='flex gap-4'>
                        <Hyperlink
                            type='body-button'
                            href='/'
                            body='📁 Chapters'
                        />
                        <Hyperlink
                            type='body-button'
                            href='/'
                            body='📁 References'
                        />
                    </div>
                    <p>
                        In 1977, the Oregon Legislature adopted the state’s
                        indeterminate (parole matrix) sentencing system.
                        Effective November 1, 1989, the legislature replaced
                        that system with the Oregon Sentencing Guidelines, a
                        determinate sentencing system. The differences between
                        indeterminate and determinate sentencing systems are
                        discussed later in this chapter. Under either system:
                        <blockquote class='m-8 border-l-8 border-blue-400 p-4'>
                            ORS 138.005(5)(a)-(b) (5) “Sentence” means all legal
                            consequences established or imposed by the trial
                            court after conviction of an offense, including but
                            not limited to: (a) Forfeiture, imprisonment,
                            cancellation of license, removal from office,
                            monetary obligation, probation, conditions of
                            probation, discharge, restitution and community
                            service; and (b) Suspension of imposition or
                            execution of any part of a sentence, extension of a
                            period of probation, imposition of a new or modified
                            condition of probation or of sentence suspension,
                            and imposition or execution of a sentence upon
                            revocation of probation or sentence suspension. [ORS
                            558.35; ORS 529.1]
                        </blockquote>
                        See also State v. Trice, 146 Or App 15, 19, 933 P2d 345,
                        rev den, 325 Or 280 (1997) (“[t]he term ‘sentence’ is
                        generally defined as ‘the judgment passed by a court or
                        judge on a person on trial as a criminal or offender’
                        and as an ‘order by which a court or judge imposes
                        punishment or penalty upon a person found guilty’”;
                        quoting Webster’s Third New International Dictionary
                        2068[sic] (unabridged ed 1993)). Although the
                        legislature and the Oregon electorate, subsequent to the
                        adoption of the guidelines, approved additional felony
                        sentencing systems, these additional systems supplement,
                        rather than replace, the guidelines. Consequently, this
                        manual primarily focuses on the guidelines. This chapter
                        discusses the guidelines’ stated principles and
                        purposes, including “[t]he centerpiece of the sentencing
                        guidelines”—the “Sentencing Guidelines Grid.” State v.
                        Davis, 315 Or 484, 487, 847 P2d 834 (1993). The chapter
                        then discusses the guidelines’ historical development
                        and the manner in which they may be amended. The chapter
                        also provides a summary of the categories of crimes and
                        defendants to which the guidelines apply. Following that
                        are analyses of the guidelines’ stated definitions and
                        the various rules used in construing the guidelines.
                        Finally, the chapter discusses certain questions
                        regarding the guidelines’ constitutionality and trial
                        court authority to impose money judgments in guidelines
                        cases.
                    </p>
                    <h1 class='text-3xl font-bold'>
                        § 1-1. OAR 213-002-0001 STATEMENT OF PURPOSES AND
                        PRINCIPLES.
                    </h1>
                    <blockquote class='mx-8 border-l-8 border-blue-400 p-4 font-thin'>
                        213-002-0001Statement of Purposes and Principles (1) The
                        primary objectives of sentencing are to punish each
                        offender appropriately, and to insure the security of
                        the people in person and property, within the limits of
                        correctional resources provided by the Legislative
                        Assembly, local governments and the people. (2)
                        Sentencing guidelines are intended to forward the
                        objectives described in section (1) by defining
                        presumptive punishments for felony convictions, subject
                        to judicial discretion to deviate for substantial and
                        compelling reasons; and presumptive punishments for
                        post-prison or probation supervision violations, again
                        subject to deviation. (3) The basic principles which
                        underlie these guidelines are: (a) The response of the
                        corrections system to crime, and to violation of
                        post-prison and probation supervision, must reflect the
                        resources available for that response. A corrections
                        system that overruns its resources is a system that
                        cannot deliver its threatened punishment or its
                        rehabilitative impact. This undermines the system’s
                        credibility with the public and the offender, and
                        vitiates the objectives of prevention of recidivism and
                        reformation of the offender. A corrections system that
                        overruns its resources can produce costly litigation and
                        the threat of loss of system control to the federal
                        judiciary. A corrections system that overruns its
                        resources can increase the risk to life and property
                        within the system and to the public. (b) Oregon’s
                        current sentencing system combines indeterminate
                        sentences with a parole matrix. Although many citizens
                        believe the indeterminate sentence sets the length of
                        imprisonment, that sentence only sets an offender’s
                        maximum period of incarceration and the matrix controls
                        actual length of stay. The frequent disparity between
                        the indeterminate sentence length and time served under
                        the matrix confuses and angers the public and damages
                        the corrections system’s credibility with the public.
                        Sentences of imprisonment should represent the time an
                        offender will actually serve, subject only to any
                        reduction authorized by law. (c) Under sentencing
                        guidelines the response to many crimes will be state
                        imprisonment. Other crimes will be punished by local
                        penalties and restrictions imposed as part of probation.
                        All offenders released from prison will be under
                        post-prison supervision for a period of time. The
                        ability of the corrections system to enforce swiftly and
                        sternly the conditions of both probation and post-prison
                        supervision, including by imprisonment, is crucial. Use
                        of state institutions as the initial punishment for
                        crime must, therefore, leave enough institutional
                        capacity to permit imprisonment, when appropriate, for
                        violation of probation and post-prison supervision
                        conditions. (d) Subject to the discretion of the
                        sentencing judge to deviate and impose a different
                        sentence in recognition of aggravating and mitigating
                        circumstances, the appropriate punishment for a felony
                        conviction should depend on the seriousness of the crime
                        of conviction when compared to all other crimes and the
                        offender’s criminal history. (e) Subject to the
                        sentencing judge’s discretion to deviate in recognition
                        of aggravating and mitigating circumstances, the
                        corrections system should seek to respond in a
                        consistent way to like crimes combined with like
                        criminal histories; and in a consistent way to like
                        violations of probation and post-prison supervision
                        conditions.
                    </blockquote>
                    <h1 class='text-3xl font-bold'>
                        § 1-1.1. Intent of Provision.
                    </h1>
                    <p>
                        The commentary to this provision states: “The purposes
                        of sentencing in Oregon and the principles that guide
                        sentencing practices to achieve those purposes are
                        legislative issues. This provision states the State
                        Sentencing Guidelines Board’s understanding of those
                        purposes and principles as provided in the guidelines
                        enabling legislation, Chapter 619, Oregon Laws 1987
                        (1987 legislation).” Sentencing Guidelines
                        Implementation Manual 6 (1989) (hereafter Implementation
                        Manual). Regardless of what the legislature declared are
                        the purposes and principles of sentencing, the Oregon
                        Constitution states its own set of principles: “Laws for
                        the punishment of crime shall be founded on these
                        principles: protection of society, personal
                        responsibility, and accountability for one’s actions and
                        reformation.” Or Const, Art I, § 15. See also State v.
                        Kinkel, 184 Or App 277, 287, 56 P3d 463, 469, rev den,
                        335 Or 142 (2002) (“[t]o the extent that the four
                        criteria [of Article I, section 15] can be applied on
                        the level of individualized sentencing, their particular
                        significance must vary depending on the circumstances of
                        the crime or crimes being sentenced”). It is noteworthy
                        that although “reformation” is a constitutionally based
                        sentencing principle, the legislative purposes and
                        principles do not mention it. To the extent the
                        principles set by legislature conflict with those set by
                        the constitution, the constitutional principles control.
                        See, e.g., State v. Baker, 328 Or 355, 364, 976 P2d 1132
                        (1999).
                    </p>
                    <blockquote class='border-l-4 border-yellow-400 bg-blue-50 p-4'>
                        Practice Tip The terms “reformation” and
                        “rehabilitation” are interchangeable. When relying on
                        Article I, section 15’s reformation principle, defense
                        counsel should cite to Pope Francis’s address to United
                        States Congress. He said, “A just and necessary
                        punishment must never exclude the dimension of hope and
                        the goal of rehabilitation.” “Visit to the Joint Session
                        of the United States Congress: ‘Address of the Holy
                        Father,’” U.S. Capitol, Washington, D.C., Sept. 24,
                        2015.
                    </blockquote>
                </div>
            ) : type === 'ors-viewer' ? (
                <>
                    <div>
                        <h1 class='text-4xl font-bold'>ORS 1.001</h1>
                        <p class='text-3xl font-thin'>
                            State policy for courts
                        </p>
                    </div>
                    <div class='flex flex-col gap-4'>
                        <ul class='flex'>
                            <li>
                                <button
                                    id='tab-btn-1'
                                    class={styleTabActive}
                                    onclick={toggleTabs}>
                                    Text
                                </button>
                            </li>
                            <li>
                                <button
                                    id='tab-btn-2'
                                    class={styleTabInactive}
                                    onclick={toggleTabs}>
                                    Annotations
                                </button>
                            </li>
                            <li class='w-full border border-transparent border-b-inherit p-4'>
                                &nbsp;
                            </li>
                        </ul>
                    </div>
                    <p
                        id='tab-body-1'
                        class='tab-body flex flex-col gap-4'>
                        The Legislative Assembly hereby declares that, as a
                        matter of statewide concern, it is in the best interests
                        of the people of this state that the judicial branch of
                        state government, including the appellate, tax and
                        circuit courts, be funded and operated at the state
                        level. The Legislative Assembly finds that state funding
                        and operation of the judicial branch can provide for
                        best statewide allocation of governmental resources
                        according to the actual needs of the people and of the
                        judicial branch by establishing an accountable,
                        equitably funded and uniformly administered system of
                        justice for all the people of this state. [1981 s.s. c.3
                        §1]
                        <hr />
                        <small>
                            <i>
                                Source: Section 1.001 — State policy for courts,{' '}
                                <Hyperlink
                                    type='standard'
                                    href='https://­oregonlegislature.­gov/bills_laws/ors/ors001.­html'
                                    body='https://­oregonlegislature.­gov/bills_laws/ors/ors001.­html'
                                />
                            </i>
                        </small>
                    </p>
                    <p
                        id='tab-body-2'
                        class='tab-body flex flex-col gap-4'>
                        <p>Law Review Citations</p>
                        <p>50 WLR 291 (2014)</p>
                    </p>
                </>
            ) : (
                <></>
            )}
        </main>
    );
}
