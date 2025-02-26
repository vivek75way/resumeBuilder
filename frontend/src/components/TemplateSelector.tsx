import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../store/reducers/resumeReducer';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    previewImage: 'https://via.placeholder.com/150?text=Modern'
  },
  {
    id: 'professional',
    name: 'Professional',
    previewImage: 'https://via.placeholder.com/150?text=Professional'
  },
  {
    id: 'creative',
    name: 'Creative',
    previewImage: 'https://via.placeholder.com/150?text=Creative'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    previewImage: 'https://via.placeholder.com/150?text=Minimal'
  }
];

const TemplateSelector: React.FC = () => {
  const dispatch = useDispatch();
  const currentTemplate = useSelector((state: any) => state.resume.template);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Choose a Template</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer p-4 border rounded-lg transition-all ${
              currentTemplate === template.id
                ? 'border-blue-500 shadow-lg'
                : 'border-gray-200 hover:border-blue-300'
            }`}
            onClick={() => dispatch(setTemplate(template.id))}
          >
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-full h-32 object-cover mb-2 rounded"
            />
            <p className="text-center font-medium">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;