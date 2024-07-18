import { useState, useEffect, useContext } from 'react';
import api from '../api';
import { AuthContext } from '../context/auth';

export const ProgramStudent = () => {
  const [programs, setPrograms] = useState<any[]>([]);
  const { user, setStudentId } = useContext(AuthContext);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('/programs');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const handleProgramSelect = (program: any) => {
    setSelectedProgram(program);
  };

  const handleSubmit = async () => {
    if (selectedProgram) {
      try {
        console.log(user?.Id);

        const student = await api.post('/students', {
          Program_Id: selectedProgram.Id,
          User_Id: user?.Id, // Replace with the current user's ID
        });
        console.log(student.data);

        setStudentId(student.data.Id);
      } catch (error) {
        console.error('Error submitting registration:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Register for a Program
        </h1>
        <table className="table-auto w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border-b">Program Name</th>
              <th className="px-4 py-2 border-b">Select</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((program) => (
              <tr key={program.Id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b text-center">
                  {program.Name}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  <input
                    type="radio"
                    name="selectedProgram"
                    checked={selectedProgram?.Id === program.Id}
                    onChange={() => handleProgramSelect(program)}
                    className="form-radio text-blue-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={!selectedProgram}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};
