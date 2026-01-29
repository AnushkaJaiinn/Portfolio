'use client';
import React from 'react';

const SkillPill = ({ skill, as: Tag = 'span' }) => (
  <Tag className="bg-gradient-to-r from-anushka-100 to-rose-100 text-anushka-700 py-2 px-4 rounded-full text-sm font-semibold shadow-md border border-anushka-200/50">
    {skill}
  </Tag>
);

export default SkillPill;