import React, { useState } from "react";
import { Brain, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { addResumeData } from "@/features/resume/resumeFeatures";
import { useParams } from "react-router-dom";
import { updateResumeData } from "@/Services/GlobalApi";
import { toast } from "sonner";

function Summary({ resumeInfo, enanbledNext }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // Declare the undeclared variable using useState
  const [summary, setSummary] = useState({
    summary: resumeInfo?.summary || "",
  }); // Declare the undeclared variable using useState
  const { resume_id } = useParams();

  const handleInputChange = (e) => {
    enanbledNext(false);
    dispatch(
      addResumeData({
        ...resumeInfo,
        [e.target.name]: e.target.value,
      })
    );
    setSummary(e.target.value);
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Summary", summary);
    const data = {
      data: { summary },
    };
    if (resume_id) {
      updateResumeData(resume_id, data)
        .then((data) => {
          console.log("Resume Updated", data);
          toast("Resume Updated", "success");
        })
        .catch((error) => {
          console.error("Error updating resume", error);
          toast("Error updating resume", "error");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }; // Declare the undeclared variable using useState

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add Summary for your job title</p>

        <form className="mt-7" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label>Add Summery</label>
            <Button
              variant="outline"
              //   onClick={() => GenerateSummeryFromAI()}
              type="button"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain className="h-4 w-4" /> Generate from AI
            </Button>
          </div>
          <Textarea
            name="summary"
            className="mt-5"
            required
            defaultValue={summary ? summary : resumeInfo?.summary}
            onChange={handleInputChange}
          />
          <div className="mt-2 flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>

      {/* {aiGeneratedSummeryList && (
                    <div className="my-5">
                        <h2 className="font-bold text-lg">Suggestions</h2>
                        {aiGeneratedSummeryList?.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setSummery(item?.summary)}
                                className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
                            >
                                <h2 className="font-bold my-1 text-primary">
                                    Level: {item?.experience_level}
                                </h2>
                                <p>{item?.summary}</p>
                            </div>
                        ))}
                    </div>
                )} */}
    </div>
  );
}

export default Summary;
