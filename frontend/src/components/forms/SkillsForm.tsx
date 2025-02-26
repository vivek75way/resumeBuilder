import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSkill, removeSkill } from '../../store/reducers/resumeReducer';
import { RootState } from '../../store/store';

const SkillsForm: React.FC = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state: RootState) => state.resume.skills);
  const [newSkill, setNewSkill] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim()) {
      dispatch(addSkill(newSkill.trim()));
      setNewSkill('');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Skills</h3>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Add a skill"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add
        </button>
      </form>

      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{skill}</span>
            <button
              onClick={() => dispatch(removeSkill(index))}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;