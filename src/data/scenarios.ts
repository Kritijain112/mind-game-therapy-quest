
import { CbtScenario } from "@/types/cbt";

export const generateMockScenarios = (): CbtScenario[] => {
  return [
    {
      id: "scenario-1",
      title: "Interview Anxiety",
      description: "Practice managing anxiety before a job interview",
      situation: "You have a job interview tomorrow and you're feeling extremely nervous. You keep thinking, 'I'm going to mess up and they'll think I'm incompetent.'",
      technique: "cognitive-restructuring",
      difficulty: "easy",
      options: [
        {
          id: "option-1-1",
          text: "I'm definitely going to fail. I should cancel the interview.",
          isHealthy: false,
          explanation: "This is catastrophic thinking. While feeling nervous is normal, assuming certain failure only increases anxiety.",
          rewardPoints: 0
        },
        {
          id: "option-1-2",
          text: "I'm feeling nervous, which is normal before interviews. I'll prepare well and do my best.",
          isHealthy: true,
          explanation: "This acknowledges your feelings while maintaining a balanced perspective. Preparation can help manage anxiety constructively.",
          rewardPoints: 20
        },
        {
          id: "option-1-3",
          text: "I'll take some time to practice common interview questions and focus on my strengths.",
          isHealthy: true,
          explanation: "This is a practical approach that channels nervous energy into productive preparation.",
          rewardPoints: 25
        }
      ]
    },
    {
      id: "scenario-2",
      title: "Social Gathering Worry",
      description: "Navigate social anxiety at a party",
      situation: "You've been invited to a party where you won't know many people. You start thinking, 'Everyone will think I'm awkward and boring.'",
      technique: "cognitive-restructuring",
      difficulty: "medium",
      options: [
        {
          id: "option-2-1",
          text: "I'll make an excuse and not go. It's easier to avoid these situations.",
          isHealthy: false,
          explanation: "Avoidance may provide temporary relief but reinforces anxiety in the long run.",
          rewardPoints: 0
        },
        {
          id: "option-2-2",
          text: "I could challenge this thought - I've had good conversations at gatherings before.",
          isHealthy: true,
          explanation: "This replaces negative assumptions with evidence from past positive experiences.",
          rewardPoints: 25
        },
        {
          id: "option-2-3",
          text: "I'll go for a short time and set a goal to have at least one conversation.",
          isHealthy: true,
          explanation: "This is a balanced approach that acknowledges discomfort while creating a manageable goal.",
          rewardPoints: 30
        }
      ]
    },
    {
      id: "scenario-3",
      title: "Mindfulness Practice",
      description: "Learn to use mindfulness when feeling overwhelmed",
      situation: "You're feeling overwhelmed with multiple deadlines and your mind is racing with worry about completing everything on time.",
      technique: "mindfulness",
      difficulty: "easy",
      options: [
        {
          id: "option-3-1",
          text: "I need to push harder and work faster, there's no time for breaks.",
          isHealthy: false,
          explanation: "Working without breaks can lead to burnout and decreased productivity.",
          rewardPoints: 0
        },
        {
          id: "option-3-2",
          text: "I'll take 5 minutes to focus on my breathing and notice my thoughts without judgment.",
          isHealthy: true,
          explanation: "This brief mindfulness practice can reduce stress and help you refocus.",
          rewardPoints: 25
        },
        {
          id: "option-3-3",
          text: "I'll make a list of tasks and take each one step by step, staying present with each task.",
          isHealthy: true,
          explanation: "Breaking down overwhelming work and focusing on one task at a time is an effective mindfulness strategy.",
          rewardPoints: 30
        }
      ]
    },
    {
      id: "scenario-4",
      title: "Low Mood Activation",
      description: "Practice behavioral activation when feeling down",
      situation: "You've been feeling low all week and don't have energy or motivation to do anything beyond the bare minimum.",
      technique: "behavioral-activation",
      difficulty: "medium",
      options: [
        {
          id: "option-4-1",
          text: "I'll wait until I feel better before doing anything else. There's no point trying now.",
          isHealthy: false,
          explanation: "Waiting to feel motivated before acting often prolongs low mood cycles.",
          rewardPoints: 0
        },
        {
          id: "option-4-2",
          text: "I'll start with one small, achievable activity that normally gives me some pleasure.",
          isHealthy: true,
          explanation: "Behavioral activation works by doing activities despite low motivation, which can gradually improve mood.",
          rewardPoints: 30
        },
        {
          id: "option-4-3",
          text: "I'll reach out to a friend for a short coffee or call, even though I don't feel like socializing.",
          isHealthy: true,
          explanation: "Social connection, even in small doses, can significantly improve mood even when motivation is low.",
          rewardPoints: 25
        }
      ]
    },
    {
      id: "scenario-5",
      title: "Problem-Solving Challenge",
      description: "Apply structured problem-solving to a difficult situation",
      situation: "You're having a recurring conflict with a colleague that's causing you significant stress at work.",
      technique: "problem-solving",
      difficulty: "hard",
      options: [
        {
          id: "option-5-1",
          text: "It's their fault. I'll just try to avoid them as much as possible.",
          isHealthy: false,
          explanation: "Avoiding the problem without addressing it rarely resolves workplace conflicts.",
          rewardPoints: 0
        },
        {
          id: "option-5-2",
          text: "I'll list possible solutions, evaluate pros and cons of each, then choose the best approach.",
          isHealthy: true,
          explanation: "This structured problem-solving approach helps you consider multiple options objectively.",
          rewardPoints: 35
        },
        {
          id: "option-5-3",
          text: "I'll ask for a meeting to understand their perspective and find common ground.",
          isHealthy: true,
          explanation: "Direct communication often resolves conflicts more effectively than avoidance or assumptions.",
          rewardPoints: 30
        }
      ]
    }
  ];
};
