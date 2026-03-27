import Float "mo:core/Float";
import Int "mo:core/Int";

actor {
  type InvestorSimulationInput = {
    followersCount : Nat;
    averageViews : Nat;
    niche : Text;
    platform : Text;
  };

  type InvestorSimulationOutput = {
    estimatedCPM : Float;
    brandDealValue : Int;
    cgnProjectedMonthlyRevenue : Int;
    roiScalingProjectionPercent : Float;
  };

  type CreatorSimulationInput = {
    followersCount : Nat;
    averageViews : Nat;
    niche : Text;
    platform : Text;
  };

  type CreatorSimulationOutput = {
    estimatedMonthlyIncome : Int;
    valuationGrade : Text;
    growthPotentialScore : Int;
    recommendations : [Text];
  };

  func calculateCPM(platform : Text, niche : Text) : Float {
    let baseCPM = switch (platform) {
      case ("YouTube") { 15000.0 : Float };
      case ("Instagram") { 12000.0 };
      case ("TikTok") { 8000.0 };
      case ("Twitter") { 10000.0 };
      case (_) { 10000.0 };
    };

    let nicheMultiplier = switch (niche) {
      case ("Finance") { 1.5 };
      case ("Technology") { 1.3 };
      case ("Lifestyle") { 1.1 };
      case ("Gaming") { 1.0 };
      case ("Education") { 1.2 };
      case (_) { 1.0 };
    };

    baseCPM * nicheMultiplier;
  };

  func calculateBrandDealValue(followersCount : Nat, averageViews : Nat, cpm : Float) : Int {
    let reachScore = (followersCount + averageViews) / 2;
    let baseValue = reachScore.toFloat() * cpm * 0.5;
    baseValue.toInt();
  };

  func calculateCGNRevenue(brandDealValue : Int) : Int {
    brandDealValue / 10;
  };

  func calculateROIScaling(cgnRevenue : Int, investment : Int) : Float {
    let roiRatio = cgnRevenue.toFloat() / investment.toFloat();
    roiRatio * 10.0;
  };

  public query ({ caller }) func runInvestorSimulation(input : InvestorSimulationInput) : async InvestorSimulationOutput {
    let cpm = calculateCPM(input.platform, input.niche);
    let brandDealValue = calculateBrandDealValue(input.followersCount, input.averageViews, cpm);
    let cgnRevenue = calculateCGNRevenue(brandDealValue);
    let investmentSize = brandDealValue * 2;
    let roiProjection = calculateROIScaling(cgnRevenue, investmentSize);

    {
      estimatedCPM = cpm;
      brandDealValue;
      cgnProjectedMonthlyRevenue = cgnRevenue;
      roiScalingProjectionPercent = roiProjection;
    };
  };

  func calculateValuationGrade(monthlyIncome : Int) : Text {
    if (monthlyIncome >= 100000000) {
      "A";
    } else if (monthlyIncome >= 50000000) {
      "B";
    } else if (monthlyIncome >= 20000000) {
      "C";
    } else {
      "D";
    };
  };

  func calculateGrowthPotential(followersCount : Nat, averageViews : Nat) : Int {
    let reach = (followersCount + averageViews) / 2;
    if (reach >= 1000000) {
      95;
    } else if (reach >= 500000) {
      80;
    } else if (reach >= 100000) {
      60;
    } else if (reach >= 50000) {
      45;
    } else {
      30;
    };
  };

  func getRecommendations(grade : Text) : [Text] {
    switch (grade) {
      case ("A") {
        [
          "Jaga konsistensi konten berkualitas",
          "Eksplorasi peluang brand deals internasional",
          "Pertimbangkan diversifikasi platform",
        ];
      };
      case ("B") {
        [
          "Fokus pada niche yang jelas",
          "Perbanyak kolaborasi dengan kreator lain",
          "Optimalkan penggunaan fitur platform",
        ];
      };
      case ("C") {
        [
          "Tingkatkan kualitas produksi konten",
          "Pelajari strategi marketing digital",
          "Gunakan data analytics untuk evaluasi",
        ];
      };
      case (_) {
        [
          "Tetap konsisten upload konten",
          "Lakukan riset tren terbaru",
          "Jangan malas promosi di platform lain",
        ];
      };
    };
  };

  public query ({ caller }) func runCreatorSimulation(input : CreatorSimulationInput) : async CreatorSimulationOutput {
    let cpm = calculateCPM(input.platform, input.niche);
    let monthlyIncome = calculateBrandDealValue(input.followersCount, input.averageViews, cpm);
    let grade = calculateValuationGrade(monthlyIncome);
    let growthScore = calculateGrowthPotential(input.followersCount, input.averageViews);
    let recommendations = getRecommendations(grade);

    {
      estimatedMonthlyIncome = monthlyIncome;
      valuationGrade = grade;
      growthPotentialScore = growthScore;
      recommendations;
    };
  };
};
