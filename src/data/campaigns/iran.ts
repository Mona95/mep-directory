export const iranCampaign = {
  id: 'iran',
  title: 'Iran Revolution Campaign',
  subtitle: 'Support stronger EU measures against the Iranian regime',

  // Multiple subject lines - randomly selected
  subjects: [
    'Iran Resolution: Support for Stronger Measures Before the Vote',
    'Urging Stronger EU Action on the Iran Resolution',
    'Please Support Decisive Measures on Iran',
    'Regarding the Upcoming Vote on Iran',
    'A Citizen\'s Appeal: Strengthen the Iran Resolution',
    'Iran Human Rights: Your Vote Matters',
  ],

  greetings: [
    { id: 'formal-name', template: 'Dear {title} {lastName},' },
    { id: 'formal-title', template: 'Dear {title},' },
    { id: 'honourable', template: 'Dear Honourable Member,' },
    { id: 'mep', template: 'Dear Member of the European Parliament,' },
    { id: 'respected', template: 'Respected {title} {lastName},' },
  ],

  openings: [
    {
      id: 'upcoming-vote',
      text: 'I am writing regarding the upcoming vote on the European Parliament resolution on Iran.',
    },
    {
      id: 'concerned-citizen',
      text: 'As a concerned citizen, I wanted to reach out about the upcoming Iran resolution.',
    },
    {
      id: 'ahead-of-vote',
      text: 'I am contacting you ahead of the important vote on EU measures regarding Iran.',
    },
    {
      id: 'compelled',
      text: 'With the upcoming vote on Iran, I felt compelled to share my concerns with you.',
    },
    {
      id: 'hope-well',
      text: 'I hope this message finds you well. I am writing about the Iran resolution that will soon come to a vote.',
    },
    {
      id: 'human-rights',
      text: 'As someone who closely follows human rights issues, I am reaching out regarding the European Parliament resolution on Iran.',
    },
  ],

  concerns: [
    {
      id: 'conditional-expulsion',
      text: 'The proposed expulsion of Iranian diplomats is limited to cases where "credible evidence" is established, leaving broad room for inaction.',
    },
    {
      id: 'no-ambassador-recall',
      text: 'The draft does not call for the recall of EU ambassadors from Tehran, which risks maintaining a level of normalization while mass killings continue.',
    },
    {
      id: 'too-conditional',
      text: 'The current measures remain too conditional and cautious given the scale of human rights violations being committed.',
    },
    {
      id: 'wrong-signal',
      text: 'At a time when executions, torture, and enforced disappearances continue, diplomatic normality sends the wrong signal — both to the perpetrators and to the victims.',
    },
    {
      id: 'internet-shutdowns',
      text: 'The resolution lacks urgency considering the ongoing systematic internet shutdowns designed to hide the regime\'s crimes from the world.',
    },
    {
      id: 'women-protesters',
      text: 'Women and young protesters are being targeted, imprisoned, and executed for demanding their basic rights.',
    },
  ],

  asks: [
    {
      id: 'remove-conditional',
      text: 'Remove conditional language on the expulsion of Iranian diplomats.',
    },
    {
      id: 'recall-ambassadors',
      text: 'Call for the recall of EU ambassadors from Tehran.',
    },
    {
      id: 'r2p-framework',
      text: 'Frame these measures clearly within the context of the UN\'s Responsibility to Protect (R2P), given the regime\'s failure to protect its own population.',
    },
    {
      id: 'irgc-terrorist',
      text: 'List the IRGC (Islamic Revolutionary Guard Corps) as a terrorist organization.',
    },
    {
      id: 'expand-sanctions',
      text: 'Expand targeted sanctions against regime officials responsible for human rights violations.',
    },
    {
      id: 'support-civil-society',
      text: 'Increase support for civil society organizations and human rights defenders inside Iran.',
    },
    {
      id: 'condemn-executions',
      text: 'Strongly condemn the ongoing executions of protesters and political prisoners.',
    },
  ],

  closings: [
    {
      id: 'will-you-support',
      text: 'May I ask directly: will you support strengthening the resolution along these lines before the vote?',
    },
    {
      id: 'urge-support',
      text: 'I urge you to support these critical measures.',
    },
    {
      id: 'stand-with',
      text: 'I hope you will stand with the people of Iran in their fight for freedom.',
    },
    {
      id: 'thank-you',
      text: 'Thank you for your time and your attention to this urgent matter.',
    },
    {
      id: 'trust-consideration',
      text: 'I trust you will give this matter the serious consideration it deserves.',
    },
    {
      id: 'history-watching',
      text: 'History is watching. I hope you will be on the right side of it.',
    },
  ],

  // 10 different body templates - randomly assigned
  // {greeting}, {opening}, {concerns}, {asks}, {personal}, {closing}, {name} are placeholders
  bodyTemplates: [
    // Template 1: Standard bullet format
    `{greeting}

{opening}

I am deeply concerned that:
{concerns}

I urge you to:
{asks}

{personal}

{closing}

Sincerely,
{name}`,

    // Template 2: Paragraph style, concerns woven in
    `{greeting}

{opening}

The situation in Iran demands urgent action. {concernsParagraph}

I believe the European Parliament should take decisive steps: {asksParagraph}

{personal}

{closing}

With respect,
{name}`,

    // Template 3: Direct asks first
    `{greeting}

{opening}

I am writing to ask you to:
{asks}

My concern is that {concernsParagraph}

{personal}

{closing}

Respectfully,
{name}`,

    // Template 4: Question-based opening
    `{greeting}

{opening}

As the vote approaches, I find myself asking: how can the EU stand by while {concernFirst}?

The current draft resolution falls short because:
{concerns}

I urge you to support measures that would:
{asks}

{personal}

{closing}

Kind regards,
{name}`,

    // Template 5: Personal story first (if provided)
    `{greeting}

{opening}

{personal}

This is why I am concerned that:
{concerns}

I respectfully ask that you:
{asks}

{closing}

Sincerely,
{name}`,

    // Template 6: Urgent tone
    `{greeting}

{opening}

Time is running out. {concernFirst}

The resolution must be strengthened to:
{asks}

We cannot afford half-measures when:
{concerns}

{personal}

{closing}

Urgently,
{name}`,

    // Template 7: Formal diplomatic style
    `{greeting}

{opening}

I wish to bring to your attention several concerns regarding the current draft resolution:
{concerns}

In light of the above, I respectfully request your support for the following measures:
{asks}

{personal}

{closing}

Yours faithfully,
{name}`,

    // Template 8: Conversational tone
    `{greeting}

{opening}

I wanted to share my thoughts with you before the upcoming vote.

Here's what worries me: {concernsParagraph}

What I'd like to see: {asksParagraph}

{personal}

{closing}

Best regards,
{name}`,

    // Template 9: Numbers/impact focused
    `{greeting}

{opening}

Every day that passes without strong action, more lives are at risk. {concernFirst}

The resolution should address:
{concerns}

Concrete steps needed:
{asks}

{personal}

{closing}

Thank you for your consideration,
{name}`,

    // Template 10: Call to leadership
    `{greeting}

{opening}

As a Member of the European Parliament, you have the power to make a real difference.

The current situation is unacceptable:
{concerns}

I am asking you to lead by supporting:
{asks}

{personal}

{closing}

With hope,
{name}`,
  ],

  personalMessagePlaceholder: `Why does this matter to you? Adding a personal touch makes your email more impactful and helps avoid spam filters.

Examples:
• "I have friends/family in Iran who live in fear every day..."
• "As someone who values human rights and democracy..."
• "The courage of Iranian protesters has inspired me to speak up..."
• "I believe the EU has a moral obligation to act decisively..."`,
};

export type IranCampaign = typeof iranCampaign;
